const Utils = require('./utils');

module.exports = function({Event, Collaborator, Project}) {
    return [
        ...Utils.createRoutes('events', Event),
        ...Utils.createRoutes('collaborators', Collaborator),
        ...Utils.createRoutes('projects', Project)
    ]
}