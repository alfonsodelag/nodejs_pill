var fs = require('fs');


function writeContent(data, path, query, status){
  var dataCollection = JSON.parse(data);
  var dataObject = {
    'path': path,
    'query': JSON.stringify(query.zipCode),
    'statusCode' : status

    console.log(dataCollection);
  };

  dataCollection.push(dataObject);

  fs.writeFile('request.json', JSON.stringify(dataCollection), function (err) {
    if (err) {
      console.log('error to load');
    } else {
      console.log(dataCollection);
    }
  });
}


module.exports = {
  serverLog: function (path, query, status) {
    try{
      fs.statSync('request.json');
      fs.readFile('request.json', function (err, data) {
        if (err) {
          console.log('error to load');
        } else {
          writeContent(data, path, query, status);
        }
      });
    }

    catch(err){
      fs.appendFile('request.json', '[]', function (err) {
        if (err) {
          console.log('error to load');
        }
      });

      fs.readFile('request.json', function (err, data) {
        if (err) {
          console.log('error to load');
        } else {
          writeContent(data, path, query, status);
        }
      });
    }

    //! This comment is how I did it before the research. I added the try catch after the research
    // if (fs.existsSync('request.json')) {
    //   fs.readFile('request.json', function (err, data) {
    //     if (err) {
    //       console.log('error to load');
    //     } else {
    //       writeContent(data, path, query, status);
    //     }
    //   });
    // } else {
    //   console.log('File doesn\'t exist');
  
    //   fs.appendFile('request.json', '[]', function (err) {
    //     if (err) {
    //       console.log('error to load');
    //     }
    //   });
  
    //   fs.readFile('request.json', function (err, data) {
    //     if (err) {
    //       console.log('error to load');
    //     } else {
    //       writeContent(data, path, query, status);
    //     }
    //   });
    // }
  }
}
