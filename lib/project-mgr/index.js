/**
 * @module myModule
 * @summary: This module's one and only purpose is to:
 * <explain as concisely as possible the single purpose of this module.>
 *
 * @description:  more detailed information here
 *
 * Author: tonyle
 * Created On: 2015-05-07
 * @license Apache-2.0
 */

var p = require('bluebird');
var fs=require('fs');
module.exports = function (config) {


  var temp=JSON.parse(fs.readFileSync(config.projectPath,"utf8"));
  var m = {};


  m.getInstances = function (projectName) {
    if(!temp.projects[projectName]) throw new Error("invalid project")
    return temp.projects[projectName].instances;
  };


  return m;
};

function generateInstanceProperties() {
  var m = {};
  m.identityFile = "~/Desktop/test/emmit.pem";
  m.secretFolder = "";
  m.user = "ubuntu";
  m.host = "54.83.47.127";
  m.secretDest = "";
  m.releaseCmd = "cd /var/www/emmit;touch test.js;ls;";
  return m;
}

