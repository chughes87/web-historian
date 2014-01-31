var fs = require('fs');
var path = require('path');
var http = require('http-request');

/* You will need to reuse the same paths many times over in the course of this sprint.
  Consider calling this function in `request-handler.js` and passing in the necessary
  directories/files. This way, if you move any files, you'll only need to change your
  code in one place! Feel free to customize it in any way you wish.
*/

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  for(var type in pathsObj) {
    // Check that the type is valid
    if (exports.paths[type] && pathsObj.hasOwnProperty(type)) {
      exports.paths[type] = pathsObj[type];
    }
  }
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(list, cb){
  fs.readFile(list, function(err,data){
    if(err) throw err;
    cb(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, cb){
  fs.readFile(this.paths.list, function(err, data){
    if(err) throw err;
    data = data.toString().split('\n');
    for (var i = 0; i < data.length; i++) {
      if(data[i] === url){
        cb(true);
        return;
      }
    }
    cb(false);
  });
};

exports.addUrlToList = function(url, cb){
  console.log('adding: '+url);
  fs.appendFile(this.paths.list, url+'\n', null, null, cb);
};

exports.isUrlArchived = function(url, cb){
  fs.exists(this.paths.archivedSites+'/'+url, function(exists){
    cb(exists, url);
  });
};
