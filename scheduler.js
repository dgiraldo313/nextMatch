var CronJob = require('cron').CronJob;
var worker = require('./worker.js');
var moment = require('moment');

var scheduler=  function(){
  return {
    start: function(){
      new CronJob('00 * * * * *', function() {
        console.log('Running Send Notifications Worker for ' +  moment().format());
        worker();
      }, null, true, '');
    }
  };
};

module.exports = scheduler();
