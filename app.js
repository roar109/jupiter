var Jupiter = require('./Jupiter').Jupiter;
var workflowsTest = require('./example-definitions');

console.log("Example 1:");
Jupiter.workflow(workflowsTest.WorkflowExample1).run("yoply");

console.log("\nExample 2:");
Jupiter.workflow(workflowsTest.WorkflowExample2).run('some random json');

console.log("\nRun forrest:");
Jupiter.workflow(workflowsTest.Forrest).run('Run forest!');

console.log("\nSimple:");
Jupiter.workflow({
  'init': function(){
    this.message += 'from here';
    return this.s1;
  },
  's1':function(){
    console.log(this.message + ' to the eternity');
  }
}).run('I, ');
