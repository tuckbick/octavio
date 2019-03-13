const Mongoose = require('mongoose');

module.exports = {
  createRoutes(name, Model) {
    return [
      {
        method: 'GET',
        path: `/api/${name}`,
        handler: async function (request, h) {
          return await Model.find({});
        }
      },
      {
        method: 'POST',
        path: `/api/${name}`,
        handler: async function (request, h) {
          return await Model.create(JSON.update(request.payload));
        }
      },
      {
        method: 'GET',
        path: `/api/${name}/{id}`,
        handler: async function (request, h) {
          return await Model.findOne({ _id: new Mongoose.Types.ObjectId(request.params.id) });
        }
      },
      {
        method: 'PUT',
        path: `/api/${name}/{id}`,
        handler: async function (request, h) {
          return await Model.findByIdAndUpdate(request.params.id, JSON.parse(request.payload)).exec();
        }
      }
    ]
  }
}