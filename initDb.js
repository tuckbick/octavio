const Mongoose = require('mongoose');
const data = require('./fakeData.json');

module.exports = async function(server) {
    const db = server.plugins["hapi-mongoose"].connection;

    const CollaboratorSchema = new Mongoose.Schema({
      id: String,
      first_name: String,
      last_name: String,
      picture: String
    })

    const ProjectSchema = new Mongoose.Schema({
      id: String,
      collaborators: [CollaboratorSchema],
      name: String
    })

    const EventSchema = new Mongoose.Schema({
      feed_user_id: String,
      feed_action: String,
      project: ProjectSchema,
      followed_user: CollaboratorSchema
    })

    const Collaborator = db.model('Collaborator', CollaboratorSchema);
    const Project = db.model('Project', ProjectSchema);
    const Event = db.model('Event', EventSchema);

    const events = [];
    const collaborators = [];
    const projects = [];

    data.forEach((event) => {
      if (event.project) {
        if (event.project.collaborators) {
          event.project.collaborators.forEach((collaborator) => {
            collaborators.push(new Collaborator(collaborator));
          })
        }
        projects.push(new Project(event.project))
      }
      if (event.followed_user) {
        collaborators.push(new Collaborator(event.followed_user))
      }
      events.push(new Event(event));
    });

    await Collaborator.remove({});
    await Project.remove({});
    await Event.remove({});

    await Collaborator.insertMany(collaborators);
    await Project.insertMany(projects);
    await Event.insertMany(events);

    return {
      Collaborator,
      Project,
      Event
    }
}