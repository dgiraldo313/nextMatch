const https = require('https');

/*Function that allows connection to Football API
  Will send all requests to get both HOME and AWAY TEAM info,
  as well as competition*/


/* Function that makes custom request to API
  -- parameters is a
  -- returns a JSON object if request === 200
    else it will print out the error
*/
function getJSON(path, content){
  //optiopns
  return new Promise(function(resolve, reject) {
    var options = {
      hostname: 'api.football-data.org',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        "X-Auth-Token": process.env.API_KEY
      }
    };
    // make request
    var request = https.request(options, (response) => {

      var body ="";

      response.on('data', (data) => {
        body += data;
      });
      // Add parsed info once request is complete
      response.on('end', () =>{
        if(response.statusCode === 200){
          //use try and catch for error
          try {
            //print the complete response data
            //return to callback
            // console.log(content);
            resolve(JSON.parse(body));
          }catch(error){
            reject(error);
          }
        }else{
          // status error
          reject({message: response.statusMessage });
        }
      });
    })
    request.end();
    //error handling
    request.on('error', (error) => {
      reject(error);
    });

  });

}

module.exports = {getJSON};
