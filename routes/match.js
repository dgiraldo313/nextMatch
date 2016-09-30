var express = require('express');
var router = express.Router();
var nextMatch = require("../models/nextMatch.js");

// next match funtion offline
// var nextMatch = require("../models/nextMatchOffline.js");

/* POST request sent by form. */
router.post('/:id', function(req, res, next) {
  var teamID = req.params.id;
  nextMatch.get(teamID).then((matchDetails)=>{
    res.render('match', {'match': matchDetails});
  });
});

/* GET request sent by url. */
router.get('/:id', function(req, res, next) {
  var teamID = req.params.id;
  console.log(teamID);
  nextMatch.get(teamID).then((matchDetails)=>{
    console.log(req.params.id);
    res.render('match', {'match': matchDetails});
  });
});

module.exports = router;
