'use strict';

var requestLogger = require('../../logger').request;

module.exports = function(server) {
  // Logging
  server.on('after', function(req, res, route, err) {
    var logData = {
      req: req,
      res: res
    };

    if (err) {
      logData.err = err;
      requestLogger.logError(req, logData);
    } else {
      requestLogger.logInfo(req, logData);
    }
  });
};
