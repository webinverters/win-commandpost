var m = require('./updateInstance');


describe('updateInstance(instance)', function () {
  var param, d;
  beforeEach(function () {
    param = {
      projectName: "project1",
      roleName: "worker"
    };

    d = {
      installSecret: sinon.stub().resolves(true),
      runReleaseScript: sinon.stub().resolves(true),
      getInstances: sinon.stub().resolves([1]),
      createEvent:sinon.stub().resolves(true)
    }
  });


  it('it gets a list of all running instances', function () {
    return m({}, d, param)
      .then(function () {
        expect(d.getInstances).to.have.been.called
      })

  });

  xdescribe('if no instances are running for the specified role.', function () {
    it('it creates an instance');
  });

  describe('if at least one instance is running for the specified role.', function () {
    it('installs the secrets on all running instances.', function () {
      return m({}, d, param)
        .then(function () {
          expect(d.installSecret).to.have.been.called;
        })
    });

    it('runs the release script on each instance.', function () {
      return m({}, d, param)
        .then(function () {
          expect(d.runReleaseScript).to.have.been.called
        })
    });
    describe('if a release fails on one or more instances:', function () {
      beforeEach(function(){
        d.runReleaseScript=sinon.stub().rejects("fail")
      })
      it('generates an event for a failed release.',function(){
        return m({},d,param)
          .then(function(){
            expect(d.createEvent).to.have.been.called;
          })
      });
      it('returns error code',function(){
        return m({},d,param)
          .then(function(result){
            expect(result.errorCode).to.equal(1)
          })
      });
      it('returns error info',function(){
        return m({},d,param)
          .then(function(result){
            expect(result.info).to.equal("Failed to update instance.")
          })
      });
    });
  });

});