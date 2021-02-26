const path = require('path');

const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
});

fastify
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/app/'
  })
  .register(require('fastify-socket.io'), {
    path: '/app/socket.io',
    origins: ['*']
  });

fastify.get('/hello', async (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.listen(
  process.env.NODE_ENV == 'production' ? 80 : 8080,
  async (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
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
    });
  }
);
