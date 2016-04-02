var Jupiter = {
  RUNNING_STATE: 'Running',
  INIT_METHOD_NAME: 'init',
  workflow: function(states) {
    validateStates(states);
    return {
      run: function(message) {
        states.message = message;
        Jupiter.runInternal(states, states[Jupiter.INIT_METHOD_NAME]);
        return Jupiter.RUNNING_STATE;
      },
      runAsync: function(message, callback) {
        states.message = message;
        setTimeout(function(){
          Jupiter.runAsyncInternal(states, states[Jupiter.INIT_METHOD_NAME]);
        },100);
      }
    };
  },
  runInternal: function(states, state) {
    if (state && isFunction(state)) {
      var resp = state.bind(states)();
      Jupiter.runInternal(states, resp);
    }
  },
  runAsyncInternal :  function(states, state){
    if (state && isFunction(state)) {
      var resp = state.bind(states)(this);
      setTimeout(function(){
          Jupiter.runAsyncInternal(states, resp);
      }, 100);
    }
  },
  continue : function(states, state){
    Jupiter.runAsyncInternal(states, state);
  }
};

function validateStates(states) {
  var keys = Object.keys(states);
  var initFound = false;
  for (i = 0; i < keys.length; i++) {
    if (isFunction(states[keys[i]]) === true) {
      if (keys[i] === Jupiter.INIT_METHOD_NAME) initFound = true;
      break;
    }
  }
  if (!initFound) throw 'No init method found';
}

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports.Jupiter = Jupiter;
