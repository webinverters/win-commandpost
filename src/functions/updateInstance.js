var p=require('bluebird')
module.exports = function (state, dep, param) {

  return p.resolve()
    .then(function () {
      return dep.getInstances(param.projectName)
    })
    .then(function(result){
      state.instances=result
    })
    .then(function () {
      return p.map(state.instances, function (instance) {
        return p.resolve()
          .then(function () {
            return dep.installSecret(instance,param.projectName)
          })
          .then(function () {
            return dep.runReleaseScript(instance,param.projectName)
          })
      })
        .catch(function (err) {
          return dep.createEvent("failed to update instance")
            .then(function () {
              return {errorCode: 1, info: "Failed to update instance."}
            })
        })
    })
};


