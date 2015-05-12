var m=require('./run-release-script');


describe('runReleaseScript()',function(){
  var instance,cmd;

  beforeEach(function(){
    instance={
      user:"user1",
      host:"host1",
      identityFile:"identityfile1",
      secretFolder:"secretpath1",
      secretDest:"secretDest1",
      logFolder:"log1",
      releaseCmd:"releaseCmd1"
    };
    cmd=sinon.stub().resolves(true);
  });

  it('transfer ssh into the machine',function(){
    var expectedResult='ssh -i identityfile1 user1@host1 "releaseCmd1"';
    return m(instance,cmd)
      .then(function(){
        expect(cmd).to.have.been.calledWith(expectedResult,instance.logFolder)
      })
  })
});