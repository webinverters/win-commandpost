var m=require('./get-instances')

describe('getInstances()',function(){
var projectName,projectListInstance;

  beforeEach(function(){
    projectName="project1";
    projectListInstance=sinon.stub().resolves([])
  });

  it('returns a list of instances',function(){
    return m(projectName,projectListInstance)
      .then(function(result){
        expect(projectListInstance).to.have.been.calledWith(projectName);
      })
  });
});