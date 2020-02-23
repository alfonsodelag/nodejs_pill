var url = require('url');
var fs = require('fs');
var path = require('path');
var filePath = './index.html';

const cities = require('cities');

// const getHTML = require('./gethtml.js');
const serverLog = require('./log.js');


// Location of your favicon in the filesystem.
var FAVICON = path.join(__dirname, 'public', 'favicon.ico');


module.exports = {
  handleRequest: function(request, response) {

    var path = url.parse(request.url).pathname;
    var query = url.parse(request.url, true).query;
    var status = response.statusCode;
    serverLog.serverLog(path, query, status);



      switch(path){
        case '/favicon.ico':
          response.setHeader('Content-Type', 'image/x-icon');
          fs.createReadStream(FAVICON).pipe(response);
          response.end();
        break;
        case '/':
          var param = query.zipCode;
          if (param){
              if(cities.zip_lookup(param) != undefined){
                var city = cities.zip_lookup(param).city;
                response.end(`The city you are in is ${city}`);
              }else{
                response.statusCode = 404;
                response.end('You can only enter US zipCodes... Try with: 10016 or 07946');
              }
          }else{
            if (fs.existsSync(filePath)) {
              fs.readFile(filePath, null, function(err, data){
                if(err){
                  response.statusCode = 404;
                  response.end('File not Found');
                }
                response.end(data);
              });
            }
          }
      break;
      default:
        response.statusCode = 404;
        response.end('I dont know...');
    }
  }
}

