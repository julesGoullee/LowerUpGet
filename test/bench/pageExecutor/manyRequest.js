'use strict';

const request = require('request');

const nbRequest = 20;
const address = 'http://localhost:3000';
const time = Date.now();

/**
 * Call pageExecutor http service
 * @param {Number} reqPos - In the queue, current req position
 *
 */
function getPage(reqPos){

  request.get(`${address}/get?address=http://google.fr`, (err, res, body) => {

    if(err){

      console.log(err, 'error');

    }

    console.log(`${Date.now()}: ${body}`);

    if(reqPos === nbRequest - 1){

      console.log(Date.now() - time);

    }
    
  });

}

/**
 * Stress pageExecutor service
 */
function run(){
  
  for(let i = 0; i < 20; i++){

    getPage(i);

  }
  
}

run();
