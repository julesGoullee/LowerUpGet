'use strict';


/**
 *  Error handler
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 */
function error(req, res){

  res.writeHead(400);
  res.end('Request incorrect');

}

module.exports = error;
