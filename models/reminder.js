var mongoose = require('mongoose');
var moment = require('moment');

var ReminderSchema = new mongoose.Schema({
  phoneNumber:String,
  homeTeam: String,
  awayTeam : String,
  date : String,
  alertTime : Number

});



var Reminder = mongoose.model('reminder', ReminderSchema);
module.exports = Reminder;
