var m = require('./updateInstance');


describe('updateInstance(instance)', function () {
  var param, dal, instance, event, testFunction;
  beforeEach(function () {
    param = {
      projectName: "project1",
      roleName: "worker"
    };

    instance = {
      updateSecrets: sinon.stub().resolves(true),
      runReleaseScript: sinon.stub().resolves(true)
    };

    dal = {
      getInstances: sinon.stub().resolves([{}, {}])
    };

    event = {
      createEvent: sinon.stub().resolves(true),
    };

    testFunction = function () {
      return m(param, dal, instance, event)
    }
  });
  
  it('it gets a list of all running instances', function () {
    return testFunction()
      .then(function () {
        expect(dal.getInstances).to.have.been.called
      })
  });

  xdescribe('if no instances are running for the specified role.', function () {
    it('it creates an instance');
  });

  describe('if at least one instance is running for the specified role.', function () {
    it('installs the secrets on all running instances.', function () {
      return testFunction()
        .then(function () {
          expect(instance.updateSecrets).to.have.been.called;
        })
    });

    it('runs the release script on each instance.', function () {
      return testFunction()
        .then(function () {
          expect(instance.runReleaseScript).to.have.been.called
        })
    });
    describe('if a release fails on one or more instances:', function () {
      beforeEach(function () {
        instance.runReleaseScript = sinon.stub().rejects("fail")
      });
      it('generates an event for a failed release.', function () {
        return testFunction()
          .then(function () {
            expect(event.createEvent).to.have.been.called;
          })
      });
      it('returns error code', function () {
        return testFunction()
          .then(function (result) {
            expect(result.errorCode).to.equal(1)
          })
      });
      it('returns error info', function () {
        return testFunction()
          .then(function (result) {
            expect(result.info).to.equal("Failed to update instance.")
          })
      });
    });
  });
});