var m=require('./install-secret');

describe('installSecret(projectName)',function(){
  var instance,cmd;

  beforeEach(function(){
    instance={
      user:"user1",
      host:"host1",
      identityFile:"identityfile1",
      secretFolder:"secretpath1",
      secretDest:"secretDest1",
      logFolder:"log1"
    };
    cmd=sinon.stub().resolves(true);
  });

  it('transfer ssh into the machine',function(){
    var expectedResult="scp -r -i identityfile1 secretpath1 user1@host1:secretDest1";

    return m(instance,cmd)
      .then(function(){
        expect(cmd).to.have.been.calledWith(expectedResult,instance.logFolder)
      })
  })
});