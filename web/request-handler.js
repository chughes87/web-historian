var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if(req.method === "GET"){
    helpers.serveAssets(res,req.url);
  }else if(req.method === "POST"){
    var data = "";
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      archive.isUrlInList(data,function(exists){
        if(exists){
          console.log(data);
          helpers.sendResponse(res, data, 200);
          // helpers.serveAssets(res, "/"+data);
        }else{
          // TODO: redirect to loading screen
          archive.addUrlToList(data,function(){
            helpers.sendResponse(res,"",302);
          });
          archive.downloadUrls(data);
        }
      });
    });
  }
  // else if(req.method === "OPTIONS"){
  //   res.writeHead(helpers.headers);
  //   res.end();
  // }
};

