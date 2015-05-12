module.exports=function(instance,cmd){

  var command="ssh -i "+
    instance.identityFile+" "+
    instance.user+"@"+
    instance.host+' "'+
    instance.releaseCmd+'"'

  return cmd(command,instance.logFolder);

};