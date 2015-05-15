var p=require('bluebird');


module.exports=function(config){
  var m={};
  m.createEvent=function(event){
    console.log(event)
    //todo wire up whatever event we want to use.
    return p.resolve();
  };
  return m;
};