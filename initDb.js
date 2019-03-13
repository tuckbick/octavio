const Mongoose = require('mongoose');
const data = require('./fakeData.json');

module.exports = async function(server) {
    const db = server.plugins["hapi-mongoose"].connection;

    const CollaboratorSchema = new Mongoose.Schema({
      _id: Mongoose.Schema.Types.ObjectId,
      first_name: String,
      last_name: String,
      picture: String
    })
    const Collaborator = db.model('Collaborator', CollaboratorSchema);

    const ProjectSchema = new Mongoose.Schema({
      _id: Mongoose.Schema.Types.ObjectId,
      collaborators: [{type: Mongoose.Schema.Types.ObjectId, ref: 'Collaborator'}],
      name: String
    })
    ProjectSchema.pre('find', function(next) {
      this.populate('collaborators')
      next();
    })
    const Project = db.model('Project', ProjectSchema);

    const EventSchema = new Mongoose.Schema({
      feed_user_id: {type: Mongoose.Schema.Types.ObjectId, ref: 'Collaborator'},
      feed_action: String,
      project: {type: Mongoose.Schema.Types.ObjectId, ref: 'Project'},
      followed_user: {type: Mongoose.Schema.Types.ObjectId, ref: 'Collaborator'}
    })
    EventSchema.pre('find', function(next) {
      this.populate('feed_user_id')
      this.populate('project')
      this.populate('followed_user')
      next();
    })
    const Event = db.model('Event', EventSchema);

    const collaborators = [];
    data.collaborators.forEach((collaborator) => {
      collaborators.push(new Collaborator(collaborator));
    });

    const projects = [];
    data.projects.forEach((project) => {
      projects.push(new Project(project));
    });

    const events = [];
    data.events.forEach((event) => {
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