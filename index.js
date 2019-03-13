'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const initDb = require('./initDb');

const launchServer = async function() {
  const server = Hapi.server({ port: 8080 });
  const options = {
    promises: 'native',
    // uri: `mongodb+srv://erickflores:4F$o1h4MFOp4@cluster0-diryt.mongodb.net/test?retryWrites=true`,
    uri: 'mongodb://localhost:27017/test?retryWrites=true',
    mongooseOptions: { useNewUrlParser: true }
  };

  await server.register({
    plugin: require('hapi-mongoose'),
    options: options
  });

  await initDb(server);

  const db = server.plugins['hapi-mongoose'].connection;

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return 'OK'
    }
  });

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};
launchServer().catch(err => {
  console.error(err);
  process.exit(1);
});
