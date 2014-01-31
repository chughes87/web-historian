var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if(req.method === "GET"){
    url = req.url.replace(/^\//, "");
    helpers.serveAssets(res,url);
  }else if(req.method === "POST"){
    var data = "";
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      data = data.split('=')[1];
      archive.isUrlArchived(data,function(exists){
        if(exists){
          res.writeHead(302, {Location:data});
          res.end();
        }
      });
      archive.isUrlInList(data,function(exists){
        if(!exists){
          res.writeHead(302, {Location:'loading.html'});
          res.end();
          archive.addUrlToList(data);
        }
      });
    });
  }
  // else if(req.method === "OPTIONS"){
  //   res.writeHead(helpers.headers);
  //   res.end();
  // }
};

