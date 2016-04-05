var Jupiter = require('./Jupiter').Jupiter;

var myWorkflow = Jupiter.workflow({
  init : function(context){
    this.message.value += 1;
    console.log('loading stuff...');
    return {status:'NEXT', states : this, state : 'config'};
  },
  config : function(context){
    console.log('configuring stuff...');
    this.message.value+=1;

    setTimeout(function(){
      this.processResult = {result:true, value : this.message};
      context.continue(this, 's1');
    }.bind(this),4000);
  },
  s1 : function(){
    console.log(this.processResult);
    console.log(this.processResult.value);
  }
});

myWorkflow.runAsync({value : 1});
