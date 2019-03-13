'use strict'

const Hapi = require('hapi');
const Boom = require('boom');
const Mongoose = require('mongoose');
const initDb = require('./initDb');

const launchServer = async function() {
  const server = Hapi.server({ port: 8080 });
  const options = {
    promises: 'native',
    uri: `mongodb+srv://erickflores:4F$o1h4MFOp4@cluster0-diryt.mongodb.net/test?retryWrites=true`,
    // uri: 'mongodb://localhost:27017/test?retryWrites=true',
    mongooseOptions: { useNewUrlParser: true }
  };

  await server.register({
    plugin: require('hapi-mongoose'),
    options: options
  });

  const {Collaborator, Event, Project} = await initDb(server);

  server.route([
    {
      method: 'GET',
      path: '/api/socialfeed',
      handler: async function (request, h) {
        try {
          return await Event.find({});
        } catch (err) {
          throw Boom.internal('Internal MongoDB error', err);
        }
      }
    },
    {
      method: 'GET',
      path: '/api/socialfeed/{id}',
      handler: async function (request, h) {
        try {
          return await Event.findOne({ _id: new Mongoose.Types.ObjectId(request.params.id) });
        } catch (err) {
          throw Boom.internal('Internal MongoDB error', err);
        }
      }
    }
  ])

  await server.start()

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};
launchServer().catch(err => {
  console.error(err);
  process.exit(1);
});
