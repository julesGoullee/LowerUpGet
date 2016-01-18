'use strict';

const jsdom = require('jsdom');
const Promise = require('bluebird');

const pageCleaner = require('./pageCleaner');

module. exports = (address) => {

  return new Promise( (resolve, reject) => {

    jsdom.env({
      'url': address,
      'features': {
        'FetchExternalResources': ['script', 'link'],
        'ProcessExternalResources': ['script', 'link']
      },
      'done': (err, window) => {

        if(err){

          return reject(err);

        }

        // let originaleTime = new Date( (Date.now() - window.times));
        const content = pageCleaner(window);

        window.close();
        return resolve(content);

      },
      'created': (err, window) => {

        if(err){

          return reject(err);

        }
        window.times = Date.now();

      }

    });

  });

};
