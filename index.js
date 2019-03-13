'use strict'
// placeholder data
const social_feed = require('./social_feed.json')

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

  server.route({
    method: 'GET',
    path: '/api/socialfeed/1',
    handler: function (request, h) {
      return social_feed
    }
  })

  await server.start()

  console.log('Server running at:', server.info.uri)
})()
