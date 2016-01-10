'use strict';

const request = require('request');
const config = require('../../../config/config');


/**
 * Check address params to calling api
 * @param {String} address - website to process
 * @return {Boolean} isValid - it's valid or not
 */
function checkGetAddressParams(address){

  let isValid = false;

  // TODO check url.query.address
  if(address && address.length > 1){

    isValid = true;

  }

  return isValid;

}


/**
 *  Call pageExecutor service
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 *  @param {Function} next - callback for next middleware
 */
function getWebsite(req, res, next){

  if(req.url.pathname === '/get'){

    if(checkGetAddressParams(req.url.query.address) ){

      console.log(`Api process for address ${req.url.query.address}`);

      const pageExectutorRequest = `${config.PageExecutor.address}:${config.PageExecutor.port}/get?address=${req.url.query.address}`;

      request.get(pageExectutorRequest, (err, resPageExecutor, pureHtml) => {

        if(err){

          console.error(err);
          res.writeHead(500);

          return res.end(err.toString() );

        }

        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/html; charset=UTF-8',
          'Content-length': pureHtml.length
        });

        return res.end(pureHtml);

      });

    } else{

      res.writeHead(401);
      res.end('Address url incorrect');

    }

  } else{

    next();

  }

}

module.exports = getWebsite;
