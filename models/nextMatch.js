var matchSpecs = require('./footballData.js');
var moment = require('moment');

//call getNextMatch() -> returns first game listed with status of inplay or scheduled
//once promise is fulfilled

function getNextMatch(teamID){
  // var teamID = getTeamID(teamName);// FIXME: for the next Version have a way to find all team info by just entering team name
  var fixturesPath = '/v1/teams/' + teamID + '/fixtures';
  // Make initial requests to get list of all fixtures
  return matchSpecs.getJSON(fixturesPath).then(helper.findNextGame)
                              .then(helper.formatDate)
                              .then(getHomeTeamData)
                              .then(getAwayTeamData)
                              .then(getCompetition);

}

// call getHomeTeamData() -> takes link to get team info
                            // cleans it up and then sends request to get team info
                            // add info to original object as home_team
                            //returns

function getHomeTeamData(gameInfo){
  var homeTeamPath = helper.cleanLink(gameInfo._links.homeTeam);
  return matchSpecs.getJSON(homeTeamPath).then((homeTeamInfo)=>{
    gameInfo["homeTeamData"] = homeTeamInfo;
    return gameInfo;
  });
}

// call getAwayTeamData() -> takes link to get team info
                            // cleans it up and then sends request to get team info
                            // add info to original object as home_team
                            //returns
function getAwayTeamData(gameInfo){
  var awayTeamPath = helper.cleanLink(gameInfo._links.awayTeam);
  return matchSpecs.getJSON(awayTeamPath).then((awayTeamInfo)=>{
    gameInfo["awayTeamData"] = awayTeamInfo;
    return gameInfo;
  });
}


// call getCompetition() ->  takes link to get team info
                            // cleans it up and then sends request to get team info
                            // add info to original object as home_team
                            //returns
function getCompetition(gameInfo){
  var competitionPath = helper.cleanLink(gameInfo._links.competition);
  return matchSpecs.getJSON(competitionPath).then((competition)=>{
    gameInfo["competition"] = competition;
    return gameInfo;
  });
}



// Helper functions
var helper= {
  cleanLink: (link)=>{
                link = link.href;
                var cleanedLink = link.split('http://api.football-data.org');
                return cleanedLink[1];
              },
  findNextGame: (content)=>{
                  var fixtures = content.fixtures;
                  var gameFound = false;
                  var nextGame;

                  fixtures.forEach((game)=>{
                    if(game.status !== "FINISHED" && game.matchday > 0){
                      while(!gameFound){
                        nextGame = game;
                        gameFound = true;
                      }
                    }
                  })
                  // add formatted date and time
                  // this.formatDate(nextGame.)
                  // helper.formatDate(date);
                  return nextGame;
                },
  formatDate: (fixture)=>{
                // get local fomatted date
                var date = moment.utc(fixture.date).local();
                var formattedDate = date.format("MMM Do, YYYY");
                var formattedTime = date.format("h:mm A");

                // add formatted date and time to JSON object
                fixture.formattedDate = formattedDate.toString();
                fixture.time = formattedTime.toString();
                return fixture;
            },

  }


// create modules
module.exports.get = getNextMatch;
