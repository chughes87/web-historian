var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if(req.method === "GET"){
    helpers.serveAssets(res,req.url);
  }else if(req.method === "POST"){
    res.writeHead(302, helpers.headers);
    var data = "";
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      data = data.split('=')[1];
      archive.addUrlToList(data,function(){
        res.end();
      });
    });
  }
};

