'use strict';

var restify,
  logger,
  pkg,
  server,
  config;

/* istanbul ignore next */
function serverOpts() {
  var opts = {
    name: pkg.name,
    version: pkg.version
  };

  if (config.captureLogs) {
    opts.log = logger.createLogger(pkg.name + '-log');
  }

  return opts;
}

require('newrelic');
restify = require('restify');
logger = require('./logger');
config = require('./config');
pkg = require('./package.json');

server = restify.createServer(serverOpts());

// Setup Middlewares
require('./server/middlewares/pre')(server);
require('./server/middlewares/use')(server);
require('./server/middlewares/after')(server);

// Setup Routes
require('./server/controllers/controller')(server);

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
