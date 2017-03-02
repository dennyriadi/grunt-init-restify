'use strict';

var request = require('supertest'),
  server = require('../../../../app');

describe('Route: /api/heartbeat', function(){
  it('should return 404 response when GET request is sent to /heartbeat', function(done){
    request(server)
      .get('/heartbeat')
      .expect(404, done);
  });

  it('should return 404 response when GET request is sent to /api/v1/heartbeat', function(done){
    request(server)
      .get('/api/v1/heartbeat')
      .expect(404, done);
  });

  it('should return 405 response when POST request is sent to /api/heartbeat', function(done){
    request(server)
      .post('/api/heartbeat')
      .expect(405, done);
  });

  it('should return 200 response when GET request is sent to /api/heartbeat', function(done){
    request(server)
      .get('/api/heartbeat')
      .expect(200, done);
  });
});