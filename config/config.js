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
    'address': 'http://localhost',
    'port': process.env.PORT || 3000
  }
};
