'use strict';

const mock = require('mock-require');

const mockedRequest = {};

mockedRequest.get = (req, cb) => {

  console.info('Mock request called');
  
  const res = {
    'statusCode': 200
  };
  
  cb(null, res, `<div></div>`);
  
};

module.exports = () => {
  
  mock('request', mockedRequest);
  return mock;

};
