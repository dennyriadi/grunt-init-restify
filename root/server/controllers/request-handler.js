'use strict';

var _ = require('lodash'),
  errorHandler = require('./error-handler');

function RequestHandler(req, res, next) {
  this.req = req;
  this.res = res;
  this.next = next;

  this.serveRequest = function(func, onSuccess) {
    var callbacks,
      self = this;

    try {
      if (!_.isFunction(func)) {
        throw new Error('Invalid serve request function.');
      }

      if (!_.isFunction(onSuccess)) {
        throw new Error('Invalid success callback function.');
      }

      callbacks = {
        error: function(err) {
          return self.next(errorHandler.throwInternalServerError(self.req, err));
        },
        success: function() {
          var responseBody = onSuccess.apply(this, arguments);
          self.res.json(200, responseBody);
          return self.next();
        }
      };

      return func.call(this).then(callbacks.success).catch(callbacks.error);
    } catch (ex) {
      return self.next(errorHandler.throwInternalServerError(self.req, ex.message));
    }
  };
}

module.exports = RequestHandler;