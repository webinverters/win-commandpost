var m=require('./create-event')

describe('createEvent()',function(){
  var event;
  var eventProvider;
  beforeEach(function(){
    event="test";
    eventProvider=sinon.stub().resolves(true);

  });


  it('create sometype of event',function(){
    return m(event, eventProvider)
      .then(function(){
        expect(eventProvider).to.have.been.calledWith(event)
      })


  })

});