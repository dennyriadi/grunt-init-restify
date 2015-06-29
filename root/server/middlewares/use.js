'use strict';

var restify = require('restify');

module.exports = function(server){
  server.use(restify.fullResponse())
    .use(restify.acceptParser(server.acceptable))
    .use(restify.queryParser({mapParams: false}))
    .use(restify.CORS())
    .use(restify.jsonp())
    .use(restify.gzipResponse())
    .use(restify.throttle({
      burst: Number(process.env.API_BURST_RATE) || 50,
      rate: Number(process.env.API_RATE) || 200,
      ip: true,
      overrides: {}
    }))
    .use(function (req, res, next) {
      res.charSet('utf-8');
      res.cache('public', {
        maxAge: 60 * 60 * 24 * 30
      });
      return next();
    });
};
