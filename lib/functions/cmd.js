var p = require('bluebird');
var spawn = require('child_process').spawn;

module.exports = function (cmd) {
  var ls = spawn('/bin/sh', ["-c", cmd]);
  var temp = p.defer()

  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
    temp.resolve(true)
  });

  return temp.promise;

};