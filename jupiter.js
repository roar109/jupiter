var Jupiter = {
  RUNNING_STATE: 'Running',
  workflow: function(states) {
    return {
      run: function(message) {
        states.message = message;
        Jupiter.runInternal(states, states['init']);
        return Jupiter.RUNNING_STATE;
      },
      runAsync: function(message, callback) {
        //runIt(states, '0', message);
        callback(Jupiter.RUNNING_STATE);
      }
    };
  },
  runInternal: function(states, state) {
    if (state && isFunction(state.body)) {
      var resp = state.body.bind(states)();
      Jupiter.runInternal(states, resp);
    }
  }
};

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports.Jupiter = Jupiter;
