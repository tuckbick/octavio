'use strict'

const Hapi = require('hapi');
const initDb = require('./initDb');

const launchServer = async function() {
  const server = Hapi.server({ port: 8080 });
  const options = {
    promises: 'native',
    uri: 'mongodb://localhost:27017/test?retryWrites=true',
    mongooseOptions: { useNewUrlParser: true }
  };

  await server.register({
    plugin: require('hapi-mongoose'),
    options: options
  });

  const db = await initDb(server);

  server.route(require('./routes')(db))

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};
launchServer().catch(err => {
  console.error(err);
  process.exit(1);
});
