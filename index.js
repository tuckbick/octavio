'use strict'

const Hapi = require('hapi')

;(async () => {
  const server = Hapi.server({ port: 8080 })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return 'OK'
    }
  })

  await server.start()

  console.log('Server running at:', server.info.uri)
})()
