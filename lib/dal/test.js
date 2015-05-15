var config = {
  file: "/Users/tonyle/Desktop/testdb.db"
};

var dal = require("./index.js")(config);
var p = require('bluebird')

return dal.listProjects()
  .then(console.log)
  .then(function () {
    process.exit(0)
  })


