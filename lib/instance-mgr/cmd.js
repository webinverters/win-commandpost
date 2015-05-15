var spawn = require('child_process').spawn;

/**
 *
 * @param cmd
 * @param stdOutFunc
 * @param stdErrFunc
 * @returns {*}
 */
module.exports = function cmd(cmd, stdOutFunc, stdErrFunc) {
  var ls = spawn('/bin/sh', ["-c", cmd]);
  var temp = p.defer()

  ls.stdout.on('data', function (data) {
    if (stdOutFunc) {
      stdOutFunc(data);
    } else {
      console.log("stdout", data.toString())
    }
  });

  ls.stderr.on('data', function (data) {
    if (stdErrFunc) {
      stdErrFunc(data);
    } else {
      console.log("err", data.toString())
    }
  });

  ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
    temp.resolve(true)
  });

  return temp.promise;

};