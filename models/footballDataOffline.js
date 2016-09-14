var fs = require('fs');


function getJSON(path, content){
  //optiopns
  return new Promise(function(resolve, reject) {
    var fileContents = fs.readFileSync('./mock/'+ path + '.json', {encoding: "utf8"});
    resolve(JSON.parse(fileContents));
  });

}

module.exports = {getJSON};
