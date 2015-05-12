
var child=require('child_process')
var p=require('bluebird')
var actions=[];

//actions.push("cd ~/.ssh");
//actions.push("echo 'start'");
//actions.push('ssh emmit-dev "cd /var/www/emmit ;touch test.js"& echo done')
//actions.push("echo 'end'");

actions.push("cd ~/.ssh");
actions.push('ssh ubuntu@54.83.47.127 -i ~/Desktop/test/emmit.pem "cd /var/www/emmit;touch test.js;ls;"')
//actions.push('scp -i ~/Desktop/test/emmit.pem ubuntu@54.83.47.127:/var/www/emmit/test.js ~/Desktop/test/')
//actions.push('scp -i ~/Desktop/test/emmit.pem ~/Desktop/test/test2.js ubuntu@54.83.47.127:/var/www/emmit/ ')
actions.push('echo done')

var command1=actions.join(";")

return run(command1)
  .then(function(aaa){
    console.log(aaa);
  })



function run(command){
  var temp= p.defer();
  child.exec(command,function(error,stdout,stderr){
    console.log(stderr);
    temp.resolve(stdout);
  });
  return temp.promise;
}


//git log -1
//git branch
//top -n 1 -b
//find test.js


function action(){
  this.actionType="sshaction";
  this.description="return the highest process";
  this.command="top -n 1 -b";
}

action.prototype.createcommand=function(){


};








