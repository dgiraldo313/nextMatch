var express = require('express');
var router = express.Router();
var moment = require('moment');
// var momentTimeZone = require('moment-timezone');s
var Reminder = require('../models/reminder');

// POST: /appointments
router.post('/reminder/new', function(req, res, next) {
  console.log(req.body);
  var phoneNumber = req.body.phoneNumber;
  var homeTeam = req.body.homeTeam;
  var awayTeam = req.body.awayTeam;
  var date = moment.utc(req.body.date).local();
  var alertTime = req.body.alertTime;

  var reminder = new Reminder({ phoneNumber: phoneNumber,
                                homeTeam: homeTeam,
                                awayTeam: awayTeam,
                                date: date,
                                alertTime : alertTime
                              });

  console.log('reminder object', reminder);
  reminder.save()
    .then(function () {
      res.json("Successfully Saved to DB");
    });

});

module.exports = router;
