var workflow1 = {
  'init': function() {
    this.message = this.message + ' - 0 ';
    console.log(this.message);
    return this.s1;
  },
  's1': function() {
    console.log('s1 - ' + this.message);
  }
};

var workflow2 = {
  'init': function() {
    console.log(this.message);
    return this.configuration;
  },
  'configuration': function(message, states) {
    this.message = "configuring..." + this.message;
    console.log(this.message);
    return this.callws1;
  },
  'callws1': function() {
    this.message = 'ws1 result';
    console.log("calling ws...");
    return this.callws2;
  },
  'callws2': function() {
    console.log("calling ws2... with " + this.message);
    this.message = 'ending this please...';
    return this.close;
  },
  'close': function() {
    console.log('closing...' + this.message);
    return null;
  }
};

var forrest = {
  times: 0,
  'init': function() {
    this.message = this.message + ' run! ';
    return this.run;
  },
  run: function() {
    if (this.times > 2)
      return null;
    console.log(this.message);
    this.times++;
    return this.init;
  }
};

module.exports.WorkflowExample1 = workflow1;
module.exports.WorkflowExample2 = workflow2;
module.exports.Forrest = forrest;