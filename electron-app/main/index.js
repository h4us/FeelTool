// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
});

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
    devTools: true
  })

  const url = isDev
    ? 'http://localhost:8000'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event, message) => {
  event.sender.send('message', message)
});

fastify
  .register(require('fastify-cors'), {
    origin: '*'
  })
  .register(require('fastify-socket.io'), {
    path: '/internal-app/socket.io',
    cors: {
      origin: '*',
    }
  });

// Test
fastify.get('/hello', async (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.listen(
  9999,
  async (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    console.log('start server');
    fastify.log.info(`server listening on ${address}`);

    fastify.io.on('connection', (socket) => {
      console.info('Socket connected!', socket.id);

      socket.emit('Start', socket.id, new Date(), Date.now());

      socket.on('tracking', (angle, dx,dy) => {
        // console.info(angle, dx, dy);

        fastify.io.of('/').emit(
          'reply', angle, dx, dy
        );
      });

      socket.on('attachment', (name, value) => {
        console.info('attachment', name, value);
        fastify.io.of('/').emit(name, value);
      });
    });
  }
);
