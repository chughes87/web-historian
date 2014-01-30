var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  res.writeHead(200, headers);
  if(asset === '/'){
    fs.readFile(archive.paths.siteAssets+'/index.html', function(err, data) {
      res.end(data);
    });
  }else{
    archive.isUrlArchived(asset,function(exists){
      if(exists){
        fs.readFile(archive.paths.archivedSites+asset, function(err, data) {
          res.end(data);
        });
      }else{
        res.writeHead(404, headers);
        res.end();
        console.log("asset not found!");
      }
    });
  }
};

// As you progress, keep thinking about what helper functions you can put here!

