module.exports = function (config) {

  var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: config.file
    }
  });


  var m = {};

  m.createProjectConfig = function (projectName) {

  };

  m.listProjectConfigs = function () {

  };

  m.getProjectConfig = function (projectName) {

  };

  m.getInstances = function (projectName) {
    return p.resolve()

  };

  m.addInstances = function () {

  };


  return m;


};