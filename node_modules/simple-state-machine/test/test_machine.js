var assert = require('assert');

var Machine = require('../index.js');

var testMachine = new Machine();

var transitionIndicator;
var arrivalIndicator;
var testPushedValue = 'Stuff';

/** 
 * Machine with one transition, and arrival callback 
 */
testMachine.addTransition('a', 'b', 
  function a_to_b_transit(object) {
    transitionIndicator = object;
    return true;
  },
  function arrived_to_b_callback() {
    arrivalIndicator = true;
  });

/**
 * Set starting state
 */
testMachine.currentStateNames = ['a'];

/**
 * Push value
 */
testMachine.push(testPushedValue);

assert.equal(transitionIndicator, testPushedValue);
assert.equal(arrivalIndicator, true);

var transitionIndicator1;
var transitionIndicator2;
var transitionIndicator3;
/**
 * Adding another couple of transitions
 */
testMachine.addTransition('b', 'c', function b_to_c_transition_1(object) {  
  if (object.test === 1) {
    transitionIndicator1 = object;
    return true;
  }
});

testMachine.addTransition('b', 'c', function b_to_c_transition_2(object) {
  if (object.test[1] === 'test') {
    transitionIndicator2 = object;
    return true;
  }  
});

testMachine.addTransition('b', 'c', function b_to_c_transition_2_1(object) {
  if (object.test[2] === 'test test') {
    transitionIndicator3 = object;
    return true;
  }  
});

testMachine.push({test:1});
assert.deepEqual(transitionIndicator1, {test:1});

testMachine.currentStateNames = ['b'];

testMachine.push({test: [0, 'test', 'test test']});
assert.deepEqual(transitionIndicator2, {test: [0, 'test', 'test test']});
assert.deepEqual(transitionIndicator3, {test: [0, 'test', 'test test']});
