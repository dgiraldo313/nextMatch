var express = require('express');
var router = express.Router();
// var nextMatch = require("../models/nextMatch.js");

// next match funtion offline
var nextMatch = require("../models/nextMatchOffline.js");

// FC Barcelona
var teamID = "81";

/* GET home page. */
router.get('/', function(req, res, next) {
  nextMatch.get(teamID).then((matchDetails)=>{
    // console.dir(matchDetails);
    res.json(matchDetails);
  });

});

module.exports = router;
