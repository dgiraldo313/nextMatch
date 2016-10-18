var mongoose = require('mongoose');
var moment = require('moment');
var twilio = require('twilio');

// fixes promises issue
mongoose.Promise = require('bluebird');

// DB Schema for reminders
var ReminderSchema = new mongoose.Schema({
  phoneNumber:String,
  homeTeam: String,
  awayTeam : String,
  date : String,
  alertTime : Number

});

// method to check and see which entries need to be notified to user
  // checks difference between current time (parameter: date) and will return true if the difference is equal to the alert time
ReminderSchema.methods.needsAlert = function (date) {
  var eventDate = moment(this.date);
  var alertTime = this.alertTime;
  // get the difference between current time and time of event
  var differenceMins = Math.round(moment.duration(moment.utc(eventDate).local()
                          .diff(moment(date).utc())
                        ).asMinutes());
  /// return true if the time difference is equal or less to the alert time
  return differenceMins <= alertTime;


};

// this function will use Twillio API to send SMS to users that need to be modified
ReminderSchema.statics.sendAlerts = function(callback){
  // check the current time and date
  var currDate = moment();

  // check to see if any of the users in queue need to be notified
  Reminder
    .find()
    .then(function(reminders) {
      reminders = reminders.filter(function(reminder) {
        return reminder.needsAlert(currDate);
      });

      if (reminders.length > 0) {
        // send alerts
        sendAlertstoUsers(reminders);
      }else{
        console.log('No reminders at this time!');
      }
    });

    // if they do
      // send reminder via SMS

  //create a function to send reminder via Twillio
  function sendAlertstoUsers(alerts){
    // create twilio object
    var client = new twilio.RestClient(process.env.twilioAccountSid, process.env.twilioAuthToken);
        alerts.forEach(function(alert) {
            var formattedTime = moment.utc(alert.date).local().format("h:mm A");
            // Create options to send the message

            var options = {
                to: alert.phoneNumber,
                from: process.env.twilioPhoneNumber,
                body: "Hi, this is a reminder that the match " + alert.homeTeam + " VS. " + alert.awayTeam + " will kick off at " + formattedTime + "!"
            };

            // Send the message!
            client.sendMessage(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    console.log('Message sent to ' + alert.phoneNumber);
                    // delete reminder when SMS alert is send
                    alert.remove();
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call(this);
        }
    }

}


var Reminder = mongoose.model('reminder', ReminderSchema);
module.exports = Reminder;
