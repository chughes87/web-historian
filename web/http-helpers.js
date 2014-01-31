var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/html"
};

exports.sendResponse = sendResponse = function(response, object, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(object);
};

exports.serveAssets = function(res, asset) {
  if(asset === '/'){
    fs.readFile(archive.paths.siteAssets+'/index.html', function(err, data){
      sendResponse(res, {data:data}, 200);
    });
  }else{
    archive.isUrlArchived(asset,function(exists){
      if(exists){
        fs.readFile(archive.paths.archivedSites+'/'+asset, function(err, data){
          sendResponse(res, data, 200);
        });
      }else{
        sendResponse(res, "", 404);
        console.log("asset not found!");
      }
    });
  }
};


// As you progress, keep thinking about what helper functions you can put here!

