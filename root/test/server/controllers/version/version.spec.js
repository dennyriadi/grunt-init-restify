'use strict';

var assert = require('assert'),
  request = require('supertest'),
  server = require('../../../../app'),
  pkg = require('../../../../package.json');

describe('Route: /api/version', function(){
  it('should return 404 response when GET request is sent to /version', function(done){
    request(server)
      .get('/version')
      .expect(404, done);
  });

  it('should return 404 response when GET request is sent to /v1/version', function(done){
    request(server)
      .get('/v1/version')
      .expect(404, done);
  });

  it('should return 405 response when POST request is sent to /api/version', function(done){
    request(server)
      .post('/api/version')
      .expect(405, done);
  });

  it('should return 200 response when GET request is sent to /api/version', function(done){
    request(server)
      .get('/api/version')
      .expect(200)
      .end(function(err, res) {
        var resBody = res.body;
        assert(!err);
        assert(resBody);
        assert.strictEqual(resBody.name, pkg.name);
        assert.strictEqual(resBody.version, pkg.version);
        done();
      });
  });
});