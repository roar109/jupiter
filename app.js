var Jupiter = require('./Jupiter').Jupiter;
var workflowsTest = require('./example-definitions');

console.log("Example 1:");
var workflow1 = Jupiter.workflow(workflowsTest.WorkflowExample1);
workflow1.run("yoply");

console.log("\nExample 2:");
Jupiter.workflow(workflowsTest.WorkflowExample2).run('some random json');

console.log("\nRun forrest:");
Jupiter.workflow(workflowsTest.Forrest).run('Run forest!');
