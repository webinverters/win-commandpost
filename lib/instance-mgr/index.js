/**
 * @module instanceMgr
 * @summary: abstract commands on an instance
 *
 * @description:  more detailed information here
 *
 * Author: tonyle
 * Created On: 2015-05-12
 * @license Apache-2.0
 */

var cmd = require('./cmd');
var p = require('bluebird');


module.exports = function (config) {
  var m = {};

  m.sendFolder = function (instanceObj, src, dst) {
    return m.transport(instanceObj).sendFolder(src, dst);
  };

  m.runScript = function (instanceObj, shellScript) {
    return m.transport(instanceObj).runScript(shellScript);
  };

  m.transport = function (instanceObj) {

    return {
      sendFolder: function (src, dst) {
        var command = util.format("scp -i %s ", instanceObj.identityFile);
        command += util.format("-r %s %s@%s:%s;", src, instanceObj.user, instanceObj.host, dst);
        return cmd(command);
      },
      runScript: function (shellScript) {
        var sshCommand = util.format('ssh -i %s %s@%s "%s";', instanceObj.identityFile, instanceObj.user, instanceObj.host, shellScript);
        return cmd(sshCommand);
      }
    }
  };


  m.updateSecrets = function (instanceObj) {
    return m.sendFolder(instanceObj, instanceObj.secretSrc, instanceObj.secretDst);
  };

  m.runReleaseScript = function (instanceObj) {
    return m.runScript(instanceObj,instanceObj.releaseCmd);

  };

  return m;
}
;



