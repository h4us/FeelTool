// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app, ipcMain, systemPreferences, Menu } = require('electron');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');

const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
});
// const serialport = require('serialport');
const { uArmSDK, findPort } = require('uarm-sdk-javascript');
const regexp = new RegExp(/Arduino/i);
const acceptPortFn = (port) => {
  // return regexp.test(port.manufacturer);
  return port.vendorId == '2341' && port.productId == '0042';
};

const customAppMenu = require('./customAppMenu');

// -- TODO:
let uarm = null;
const withSocketIO = false;
// --

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  // session.fromPartition('serial-partition').setPermissionCheckHandler((webContents, permission) => {
  //   if (permission === 'serial') {
  //     return true;
  //   }
  //   return false;
  // });

  Menu.setApplicationMenu(customAppMenu);

  const port = await findPort(acceptPortFn).catch(err => err);

  if (typeof port === 'object' && port['path']) {
    uarm = new uArmSDK({
      port,
      autoOpen: false,
      onError: (error) => {
        console.log("uArm Error: ", error);
      },
    });

    await uarm.open();
    await uarm.setMode(3);
    await uarm.move(200, 0, 150, 50);
  } else {
    // TODO
    console.error('uarm not found!');
  }

  if (/^(darwin|win).*$/.test(process.platform)) {
    console.info('need system preferences check');

    if (systemPreferences.getMediaAccessStatus('camera') !== 'granted') {
      await systemPreferences.askForMediaAccess('camera');
    }
  }

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: join(__dirname, withSocketIO ? 'preload.js' : 'preload-no-sio.js'),
    }
  });

  mainWindow.webContents.session.protocol.registerFileProtocol('assets', (req, cb) => {
    cb({ path: req.url.substr(8) });
  });

  if (isDev) {
    mainWindow.webContents.on('did-finish-load', _ => mainWindow.webContents.openDevTools());
  }

  const url = isDev
    ? 'http://localhost:8000'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
    });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event, message) => {
  console.log(event, message);
  // event.sender.send('message', message);
});

ipcMain.on('tracking', (event, message) => {
  const [angle = 90 , dx = 200, dy = 150] = message;

  if (uarm) {
    uarm.movePolar(200, angle, dy, 200);
  }
});

// ipcMain.handle('serialport', async(event, ...args) => {
//   return Promise.resolve(fp);
// });

if (withSocketIO) {
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

        socket.on('tracking', (angle, dx, dy) => {
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
}
