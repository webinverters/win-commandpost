module.exports = function (config) {


  var db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: config.file
    }
  });


  var m = {};

  m.createProjectConfig = function (projectName) {

  };

  m.listProjects = function () {
    return db("instances").select()
  };

  m.getProjectConfig = function (projectName) {

  };

  m.getInstances = function (projectName) {
    return db("instances").where("projectName",projectName)
      .then(function (result) {
        return _.map(result, function (obj) {
          return {
            user: obj.user,
            host: obj.host,
            "identityFile": obj.identityfile,
            releaseCmd: obj.releasecmd,
            secretSrc: obj.secretsrc,
            secretDst: obj.secretdst
          }
        });
      })
  };

  m.addInstances = function () {

  };


  return m;


};