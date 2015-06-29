'use strict';

var bunyan = require('bunyan'),
  config = require('./config');

/* istanbul ignore next */
function createLogger(logName) {
  var logOptions = {
    name: logName,
    serializers: {
      req: function (req) {
        return {
          url: req.url,
          method: req.method,
          headers: req.headers,
          params: req.params,
          remoteAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        };
      },
      res: function (res) {
        return {
          statusCode: res.statusCode,
          headers: res.getHeaders()
        };
      }
    }
  };

  if (config.logentriesToken) {
    var getLogStream = require('logentries-stream');
    logOptions.streams = [{
      stream: getLogStream(config.logentriesToken, 'info'),
      level: 'info'
    }, {
      stream: getLogStream(config.logentriesToken, 'err'),
      level: 'error'
    }];
  } else {
    logOptions.streams = [{
      stream: process.stdout,
      level: 'error'
    }];
  }

  return new bunyan(logOptions);
}

function logRequest(logLevel) {
  return function(req, logData) {
    if (!config.captureLogs) {
      return;
    }

    req.log[logLevel](logData);
  };
}

module.exports = {
  createLogger: createLogger,
  request: {
    logInfo: logRequest('info'),
    logError: logRequest('error')
  }
};
