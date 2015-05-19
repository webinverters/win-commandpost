/**
 * @module index.js
 * @summary: Wires up the library.
 *
 * @description:
 *
 * Author: justin
 * Created On: 2015-03-21.
 * @license Apache-2.0
 */

require('win-common')();

module.exports = function construct(config) {

  var dal;
  if(config.dal){
    dal=config.dal;
  }else{
    dal=require('./lib/dal')(config);
  }

  var event=require('./lib/event')(config);
  var instanceMgr=require('./lib/instance-mgr')(config);

  var m = {};

  /**
   * Given a project name and a role, run a deployment on all existing instances of that role type.
   * A deployment consists of:
   * 1. Ensuring keys and other secrets are up-to-date on the instance.
   * 2. Run the release script on the instance.
   * 3. If the release script fails (let the release script handle rollbacks)
   * 4. If any failures occur create an event indicating what happend with the logs.
   * 5. Make it possible to access the logs of what happened when the release script was run.
   *
   * @dependency: The release script can take an optional argument called "restart"
   * @param params.key if the project has a key, this is required to do any operations on the project.
   * @param params.projectName
   * @param params.env
   * @param [bool] params.autoCreateIfNotExists If true, and the instance doesnt exist for this role, it will create it first.
   */
  m.updateInstance = function(param) {
    // projectMgr - has secret data sectioned by environment/project/role
    // cloudMgr - can provide all instances by role/project, it can create an instance if it doesn't exist.
    // instanceMgr - can run a script on the remote instance (can pass arguments to the script),
    // can copy data to instance
    // instanceMgr.updateSecrets({instanceId: 'xxx', secrets: ''})
    // instanceMgr.release('instanceI)
    // instanceMgr.getLogStream(tag)

    return require('./src/functions/updateInstance')(param,dal, instanceMgr, event);
  };






  /**
   * Procures an instance in the cluster, runs the release script, and health check passes.
   * If using the HTTP API (not implemented in this module),
   * poll listInstances to see when it is online.
   *
   * @param params.key if the project has a key, this is required to do any operations on the project.
   * @param params.projectName
   * @param params.roleName
   *
   * @return resolves when the instance is fully operational.
   */
  m.createInstance = function(params) {

  };

  /**
   *
   * @param ProjectConfig
   */
  m.createProjectConfig = function(state,dep,params) {


  };

  /**
   * projectName, key
   * @param params
   */
  m.setProjectKey = function(state,dep,params) {


  };

  /**
   * List all the instances that are currently running or started
   * (even if they are not available).
   *
   * @param params.projectName
   * @param params.roleName
   * @param params.instanceId
   */
  m.listInstances = function(state,dep,params) {
    //
  };

  return m;
};