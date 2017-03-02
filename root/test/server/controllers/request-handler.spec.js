'use strict';

var _ = require('lodash'),
  assert = require('assert'),
  RequestHandler = require('../../../server/controllers/request-handler');

describe('RequestHandler', function() {
  var requestHandler = new RequestHandler();

  it('should contain req attribute', function() {
    assert(requestHandler.hasOwnProperty('req'));
  });

  it('should contain res attribute', function() {
    assert(requestHandler.hasOwnProperty('res'));
  });

  it('should contain next attribute', function() {
    assert(requestHandler.hasOwnProperty('next'));
  });

  it('should contain serveRequest function', function() {
    assert(_.isFunction(requestHandler.serveRequest));
  });

  describe('serveRequest()', function() {
    it('should throw exception if handler function is not passed in', function() {
      assert.throws(function() { requestHandler.serveRequest(null, function() {}); });
    });

    it('should throw exception if success callback function is not passed in', function() {
      assert.throws(function() { requestHandler.serveRequest(function() {}); });
    });
  });
});