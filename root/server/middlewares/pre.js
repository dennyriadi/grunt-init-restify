'use strict';

var restify = require('restify');

module.exports = function(server) {
  server.pre(restify.pre.pause())
    .pre(restify.pre.userAgentConnection())
    .pre(restify.pre.sanitizePath());
};