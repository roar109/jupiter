var workflow1 = {
  'init': {
    body: function() {
      this.message = this.message + ' - 0 ';
      console.log(this.message);
      return this.s1;
    }
  },
  's1': {
    body: function() {
      console.log('s1 - ' + this.message);
    }
  }
};

var workflow2 = {
  'init': {
    body: function() {
      console.log(this.message);
      return this.configuration;
    }
  },
  'configuration': {
    body: function(message, states) {
      this.message = "configuring..." + this.message;
      console.log(this.message);
      return this.callws1;
    }
  },
  'callws1': {
    body: function() {
      this.message = 'ws1 result';
      console.log("calling ws...");
      return this.callws2;
    }
  },
  'callws2': {
    body: function() {
      console.log("calling ws2... with " + this.message);
      this.message = 'ending this please...';
      return this.close;
    }
  },
  'close': {
    body: function() {
      console.log('closing...' + this.message);
      return null;
    }
  }
};

var forrest = {
  times : 0,
  'init': {
    body: function() {
      this.message = this.message + ' run! ';
      return this.run;
    }
  },
  run: {
    body: function() {
      if(this.times > 2)
        return null;
      console.log(this.message);
      this.times++;
      return this.init;
    }
  }
};

module.exports.WorkflowExample1 = workflow1;
module.exports.WorkflowExample2 = workflow2;
module.exports.Forrest = forrest;
