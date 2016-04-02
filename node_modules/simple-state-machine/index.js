var Machine = function() {
  this.base = {};
  this.currentStateNames = [];

  this.arrivalCallbacks = {};

  this.newCurrentStateNames = [];

  this.pushes = 0;
}

Machine.prototype.addTransition = function(stateFromName, stateToName, transitCondition, arrivalCallback) {  
  if (typeof this.base[stateToName] === 'undefined') {
    this.base[stateToName] = {'to' : []};
    this.arrivalCallbacks[stateToName] = [];
  }

  if (typeof this.base[stateFromName] === 'undefined') {
    this.base[stateFromName] = {'to' : []};
  }

  var transitionDefinition = {};
  transitionDefinition[stateToName] = transitCondition;

  this.base[stateFromName].to.push(transitionDefinition);

  if (typeof arrivalCallback === 'function') {
    this.arrivalCallbacks[stateToName] = arrivalCallback;
  }
}

Machine.prototype.push = function(object) {
  var self = this;

  if (self.currentStateNames.length === 0) {
    return new Error("Initial state is not defined.");
  }

  self.currentStateNames.forEach(function(currentStateName) {

    self.base[currentStateName].to.forEach(function(transitionDefinition) {    
      var toStateName = Object.getOwnPropertyNames(transitionDefinition)[0];      

      if (transitionDefinition[toStateName](object)) {
        self.newCurrentStateNames.push(toStateName);      
        if (typeof self.arrivalCallbacks[toStateName] === 'function') {
          self.arrivalCallbacks[toStateName]();
        }
      }
    });
  });

  if (this.newCurrentStateNames.length !== 0) {
    this.currentStateNames = this.newCurrentStateNames;
  }
  else {
    return new Error("Transition was impossible.");
  }
}

module.exports = Machine

// {
//   'st1' : {
//     'to' : [
//       {'st5' : fn_st1tost5},
//       {'st7' : fn_st1tost7}
//     ]
//   },
//   'st2' : {
//     'to' : [
//       {'st3' : fn_st1tost5},
//       {'st4' : fn_st1tost7},
//       {'st4' : fn_st1tost7_1}
//     ]
//   }
// }
