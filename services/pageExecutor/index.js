'use strict';

const pageExecutor = require('./pageExecutor');
const httpServe = require('./httpServe');
const Promise = require('bluebird');


/**
 * Listen http request from api process to execute page
 */
function listenWorker(){
  
  httpServe( (url) => {

    console.log(`Worker PID ${process.pid} process for address ${url}`);

    return new Promise( (resolve, reject) => {

      pageExecutor(url).then( (htmlContent) => {

        resolve(htmlContent);

      }).error( (err) => {

        reject(err);

      });

    });

  });
  
}

module.exports = listenWorker;
