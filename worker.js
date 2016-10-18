var Reminder = require('./models/reminder.js');


var run = function() {
  console.log('worker running');
  Reminder.sendAlerts();
}

module.exports = run;
