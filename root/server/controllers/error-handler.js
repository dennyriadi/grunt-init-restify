'use strict';

var restify = require('restify'),
  requestLogger = require('../../logger').request;

var errorHandler = {};

errorHandler.throwBadRequestError = function(error) {
  return new restify.errors.BadRequestError(error);
};

errorHandler.throwInternalServerError = function(req, error) {
  if (req && error) {
    requestLogger.logError(req, error);
  }

  return new restify.errors.InternalServerError('Internal server error occurred while processing request.');
};

module.exports = errorHandler;