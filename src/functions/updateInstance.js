var p = require('bluebird');


module.exports = function (param, dal, instance, event) {



  var state = {};//holds all internal states

  return dal.getInstances(param.projectName,param.env)
    .then(function (resultInstances) {
      state.instances = resultInstances;
    })
    .then(function () {
      _.forEach(state.instances, function (instanceObj) {
        if (!(instanceObj.secretKey == param.key)) {
          console.log("error!",instanceObj.secretKey)
          throw new Error("invalid key!")
        }
      })
    })
    .then(function () {
      return p.map(state.instances, function (instanceObj) {
        return p.resolve()
          .then(function () {
            return instance.updateSecrets(instanceObj)
          })
          .then(function () {
            return instance.runReleaseScript(instanceObj)
          })
      })
        .catch(function (err) {
          return event.createEvent("failed to update instance")
            .then(function () {
              return {errorCode: 1, info: "Failed to update instance."}
            })
        })

    })
};


