var Jupiter = require('./Jupiter').Jupiter;
var workflowsTest = require('./tests');

console.log("Example1:");
var workflow1 = Jupiter.workflow(workflowsTest.WorkflowExample1);
workflow1.run("yoply");

console.log("\nExample2:");
Jupiter.workflow(workflowsTest.WorkflowExample2).run('some random json');

console.log("\nRun forrest:");
Jupiter.workflow(workflowsTest.Forrest).run('Run forest!');
