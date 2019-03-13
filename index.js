"use strict";

const Hapi = require("hapi");
const Boom = require("boom");


const launchServer = async function() {
  const server = Hapi.server({ port: 8080 });
  const options = {
    promises: "native",
    uri: `mongodb+srv://erickflores:4F$o1h4MFOp4@cluster0-diryt.mongodb.net/test?retryWrites=true`,
    mongooseOptions: { useNewUrlParser: true }
  };

  await server.register({
    plugin: require("hapi-mongoose"),
    options: options
  });

  server.route({
    method: "GET",
    path: "/",
    async handler(request) {
      const db = server.plugins["hapi-mongoose"].connection;
      const {ObjectID} = server.plugins["hapi-mongoose"].lib;

      try {
        const result = await db
          .collection("users")
          .findOne({ _id: new ObjectID(request.params.id) });
        return result;
      } catch (err) {
        throw Boom.internal("Internal MongoDB error", err);
      }
    }
  });

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};
launchServer().catch(err => {
  console.error(err);
  process.exit(1);
});
