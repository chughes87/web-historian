var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if(req.method === "GET"){
    if(req.url === "/"){
      helpers.serveAssets(res,"index.html");
    }
  }
  // res.end(archive.paths.list);
};

