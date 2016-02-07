'use strict';

const _require = require('mock-require');

const _request = {};

_request.get = (req, cb) => {
  
  console.info('Mock request called', req);
  
  const res = {
    'statusCode': 200
  };
  
  cb(null, res, `<div></div>`);
  
};

module.exports = () => {

  _require('request', _request);
  return { _require, _request };

};
