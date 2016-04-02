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
  'init': function(context){
    this.message += 'from here';
    setTimeout(function(){
      context.continue(this, this.s1);
    }.bind(this),2000);
  },
  's1':function(context){
    console.log(this.message + ' to the eternity');
  }
}).runAsync('I, ');
