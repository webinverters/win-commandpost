module.exports = function (config) {
  var projectMgr = require('../../lib/project-mgr')(config.projectMgr);
  var functions = require('../../lib/functions');
  var m = {};

  /**
   *
   * @param instance
   * @returns {*} returns an array of instances
   */
  m.installSecret = function (instance) {

    return require('./install-secret')(instance, functions.cmd);
  };

  /**
   *
   * @param instance
   * @returns {*}
   */
  m.runReleaseScript = function (instance) {
    return require('./run-release-script')(instance, functions.cmd);
  };

  /**
   *
   * @param projectName
   */
  m.getInstances = function (projectName) {
    return require('./get-instances')(projectName, projectMgr.getInstances);
  };

  m.createEvent = function (event) {

    return require('./create-event')(event, functions.createEvent)
  };

  return m;
};