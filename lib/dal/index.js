module.exports = function (config) {

  console.log(config.file)
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
    return db("instances").select()
      .then(function (result) {
        var temp=_.map(result, function (obj) {
          return {
            user: obj.user,
            host: obj.host,
            "identityFile": obj.identityfile,
            releaseCmd: obj.releasecmd,
            secretSrc: obj.secretsrc,
            secretDst: obj.secretdst
          }
        });
        return temp
      })
  };

  m.addInstances = function () {

  };


  return m;


};