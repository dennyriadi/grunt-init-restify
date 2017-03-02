'use strict';

var routePath = '/heartbeat';

function heartbeatHandler(req, res, next) {
  res.status(200);
  res.end();
  return next();
}

module.exports = function(pathPrefix, server) {
  server.get(pathPrefix + routePath, heartbeatHandler);
};