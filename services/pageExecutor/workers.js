'use strict';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const pageExecutor = require('./index');

/**
 * Master process message handler.
 * @param {Object} worker - worker to listen
 */
function getMessageWorker(worker){

  worker.on('message', (msg) => {

    console.log(msg, 'Master process message');

  });

}


/**
 * Fork to create worker load balancing,
 */
function launchFork(){

  for(let i = 0; i < numCPUs; i++){

    const worker = cluster.fork();

    getMessageWorker(worker);

  }

}

if(cluster.isMaster){

  launchFork();

} else if(cluster.isWorker){

  pageExecutor();

}
