var m=require('./cmd')

describe('cmd(cmd)',function(){

  it('resolves true after successfully running a command',function(){
    return m("echo hi")
      .then(function(result){
        expect(result).to.equal(true)
      })


  })

});