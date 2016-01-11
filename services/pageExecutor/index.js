'use strict';

const pageExecutor = require('./modules/pageExecutor');
const httpServe = require('./modules/httpServe');
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

      }).catch( (err) => {

        reject(err);

      });

    });

  });
  
}

listenWorker();
