'use strict'

const Hapi = require('hapi')
const Vision = require('vision')
const Handlebars = require('handlebars')

;(async () => {
  const server = Hapi.server({ port: 8080 })

  await server.register(Vision)

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.view('index')
    }
  })

  await server.start()

  console.log('Server running at:', server.info.uri)
})()
