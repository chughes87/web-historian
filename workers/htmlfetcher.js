var http = require('http-request');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

fs.readFile(archive.paths.list, function(err, data){
  if(err) throw err;
  var arr = data.toString().split('\n');
  for (var i = 0; i < arr.length; i++) {
    archive.isUrlArchived(arr[i], function(exists, url) {
      if(!exists) {
        http.get({url:'http://'+url}, function(err,res){
          if(err) throw err;
          fs.writeFile(archive.paths.archivedSites+'/'+url,
            res.code + res.header + res.buffer.toString(), 
            function(err, data){
              console.log("SUCCESS!!11!");
            });
        });
      }
    });
  }
});
