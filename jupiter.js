var Jupiter = {
  RUNNING_STATE: 'Running',
  INIT_METHOD_NAME: 'init',
  workflow: function(states) {
    this.validateStates(states);
    return {
      run: function(message) {
        states.message = message;
        Jupiter.runInternal(states, states[Jupiter.INIT_METHOD_NAME]);
        return Jupiter.RUNNING_STATE;
      },
      runAsync: function(message, callback) {
        //runIt(states, '0', message);
        callback(Jupiter.RUNNING_STATE);
      }
    };
  },
  runInternal: function(states, state) {
    if (state && isFunction(state)) {
      var resp = state.bind(states)();
      Jupiter.runInternal(states, resp);
    }
  },
  validateStates: function(states) {
    var keys = Object.keys(states);
    var initFound = false;
    for (i = 0; i < keys.length; i++) {
      if (isFunction(states[keys[i]]) === true) {
        if (keys[i] === Jupiter.INIT_METHOD_NAME) initFound = true;
      }
    }
    if (!initFound) throw 'No init method found';
  }
};

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports.Jupiter = Jupiter;
