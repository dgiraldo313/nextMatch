var mongoose = require('mongoose');
var moment = require('moment');

var ReminderSchema = new mongoose.Schema({
  phoneNumber:String,
  homeTeam: String,
  awayTeam : String,
  date : String,
  alertTime : Number

});

// method to check and see which entries need to be notified to user
ReminderSchema.methods.needsAlert = function (date) {
  return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};


var Reminder = mongoose.model('reminder', ReminderSchema);
module.exports = Reminder;
