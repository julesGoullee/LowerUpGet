'use strict';

const mockRequire = require('mock-require');

const mock = {};

const mockRequest = {};

mockRequest.get = (req, cb) => {
  
  console.info('Mock request called', req);
  
  const res = {
    'statusCode': 200
  };
  
  cb(null, res, `<div></div>`);
  
};

mock.require = mockRequire;
mock.request = mockRequest;

module.exports = () => {

  mockRequire('request', mockRequest);
  return mock;

};
