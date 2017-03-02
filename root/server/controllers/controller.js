'use strict';

var fs = require('fs'),
  path = require('path');

var pathPrefix = '/api';

function isDirectory(dirPath, filename) {
  var stats = fs.lstatSync(path.join(dirPath, filename));
  return stats.isDirectory();
}

function initializeRoute(path, server) {
  require(path)(pathPrefix, server);
}

function loadRoutesWithinDirectory(dirPath, server) {
  fs.readdirSync(dirPath)
    .forEach(function(file) {
      if (isDirectory(dirPath, file)) {
        loadRoutesWithinDirectory(path.join(dirPath, file), server);
      } else {
        initializeRoute(path.join(dirPath, file), server);
      }
    }
  );
}

module.exports = function(server) {
  fs.readdirSync(__dirname)
    .filter(function(file) {
      return isDirectory(__dirname, file);
    })
    .forEach(function(directory) {
      loadRoutesWithinDirectory(path.join(__dirname, directory), server);
    }
  );
};