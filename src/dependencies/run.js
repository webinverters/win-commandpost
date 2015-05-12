var child=require('child_process')
var p=require('bluebird');

module.exports=function(instance,cmd){
  var command="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i "+
      instance.identityfile+" "+
      instance.user+"@"+instance.server+' "' +cmd+'"';



  var temp= p.defer();
  child.exec(command,function(error,stdout,stderr){
    console.log(command)
    temp.resolve(stdout);

  });
  return temp.promise;
};
