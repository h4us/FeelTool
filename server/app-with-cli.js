'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  console.log('hello1', opts);
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}


// const path = require('path');

// // Require the framework and instantiate it
// const fastify = require('fastify')({
//   logger: true
// })

// // Declare a route
// fastify.get('/', function (request, reply) {
//   reply.send({ hello: 'world' })
// })

// // Run the server!
// fastify.listen(
//   process.env.NODE_ENV == 'production' ? 80 : 8080,
//   function(err, address) {
//     if (err) {
//       fastify.log.error(err)
//       process.exit(1)
//     }
//     fastify.log.info(`server listening on ${address}`)
//   }
// )
