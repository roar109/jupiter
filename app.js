var Jupiter = require('./Jupiter').Jupiter;
var workflowsTest = require('./tests');


var workflow1 = Jupiter.workflow(workflowsTest.WorkflowExample1);
workflow1.run("yoply");

Jupiter.workflow(workflowsTest.WorkflowExample2).run('Run forest!');
