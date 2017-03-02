'use strict';

var routePath = '/version',
  pkg = require('../../../package.json');

function versionHandler(req, res, next) {
  var name = pkg.name,
    version = pkg.version;

  res.header('ETag', version);
  res.send(200, {
    name: name,
    version: version
  });
  return next();
}

module.exports = function(pathPrefix, server) {
  server.get(pathPrefix + routePath, versionHandler);
};