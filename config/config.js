'use strict';

//const nbCpu = require('os').cpus().length;

module.exports = {
  'PageExecutor': {
    'address': 'http://localhost',
    'port': 4000
  },
  'frontEnd': {
    'cache': {
      'active': true
    },
    'address': process.env.FRONT_END_ADDRESS || 'http://localhost:4000',
    'port': process.env.PORT || 3000
  }
};
