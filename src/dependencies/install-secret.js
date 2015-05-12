spawn = require('child_process').spawn;
var p=require('bluebird')


module.exports=function(instance,cmd){


  if(!instance.secretDest) return p.resolve();
  if(!instance.secretFolder) return p.resolve();
  var command="scp -r -i "+
      instance.identityFile+" "+
      instance.secretFolder+" "+
      instance.user+"@"+
      instance.host+":"+
      instance.secretDest;

  return cmd(command,instance.logFolder);

};