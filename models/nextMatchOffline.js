var matchSpecs = require('./footballDataOffline.js');

//call getNextMatch() -> returns first game listed with status of inplay or scheduled
//once promise is fulfilled

function getNextMatch(teamID){
  // var teamID = getTeamID(teamName);// FIXME: for the next Version have a way to find all team info by just entering team name
  var fixturesPath = 'fixtures';
  // Make initial requests to get list of all fixtures
  return matchSpecs.getJSON(fixturesPath).then(helper.findNextGame)
                              .then(getHomeTeamData)
                              .then(getAwayTeamData)
                              .then(getCompetition);

}

// call getHomeTeamData() -> takes link to get team info
                            // cleans it up and then sends request to get team info
                            // add info to original object as home_team
                            //returns

function getHomeTeamData(gameInfo){
  var homeTeamPath = 'homeTeam';
  // console.log(homeTeamPath);
  return matchSpecs.getJSON(homeTeamPath).then((homeTeamInfo)=>{
    gameInfo["homeTeamData"] = homeTeamInfo;
    // console.log(gameInfo);
    return gameInfo;
  });
}

// call getAwayTeamData() -> takes link to get team info
                            // cleans it up and then sends request to get team info
                            // add info to original object as home_team
                            //returns
function getAwayTeamData(gameInfo){
  var awayTeamPath = 'awayTeam';
  // console.log(homeTeamPath);
  return matchSpecs.getJSON(awayTeamPath).then((awayTeamInfo)=>{
    gameInfo["awayTeamData"] = awayTeamInfo;
    // console.log(gameInfo);
    return gameInfo;
  });
}


// call getCompetition() ->  takes link to get team info
                            // cleans it up and then sends request to get team info
                            // add info to original object as home_team
                            //returns
function getCompetition(gameInfo){
  var competitionPath = 'competition';
  // console.log(homeTeamPath);
  return matchSpecs.getJSON(competitionPath).then((competition)=>{
    gameInfo["competition"] = competition;
    // console.log(gameInfo);
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
                    if(game.status !== "FINISHED"){
                      while(!gameFound){
                        nextGame = game;
                        gameFound = true;
                      }
                    }
                  })
                  return nextGame;
                },

    // itererate through all fixtures and return as soon as it find a status of inplay or scheduled
  }


// create modules
module.exports.get = getNextMatch;
