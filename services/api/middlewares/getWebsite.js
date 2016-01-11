'use strict';

const request = require('request');
const Promise = require('bluebird');
const config = require('../../../config/config');
const cacheApi = require('../cache/index');

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
 * Return clean html and part of headers response from url
 * @param  {String} pageExecutorRequest - address http://website.com
 * @return {Object} promise resolve when cache find or pageExecutor send result
 */
function getPureHtml(pageExecutorRequest){

  return new Promise( (resolve, reject) => {

    if(config.frontEnd.cache.active && cacheApi.has(pageExecutorRequest) ){

      console.log(`Api use cache for address ${pageExecutorRequest}`);
      
      const pureHtml = cacheApi.get(pageExecutorRequest);
      const headers = {
        'Content-length': pureHtml.length,
        'lower-up-caching': 'true'
      };

      return resolve({ pureHtml, headers });

    }
    request.get(pageExecutorRequest, (err, resPageExecutor, pureHtml) => {

      if(err || resPageExecutor.statusCode !== 200){
        
        if(!err){
          
          err = new Error(`Error PageExecutor: code: ${resPageExecutor.statusCode}, body: ${pureHtml}`);

        }
        
        return reject(`code: ${err.code}, error: ${err}`);

      }
      
      if(config.frontEnd.cache.active){
        
        console.log(`Api caching address ${pageExecutorRequest}`);
        cacheApi.set(pageExecutorRequest, pureHtml);
        
      }

      const headers = {
        'Content-length': pureHtml.length,
        'lower-up-caching': 'false'
      };
      
      return resolve({ pureHtml, headers });
      
    });

  });

}

/**
 *  Call pageExecutor service
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 *  @param {Function} next - callback for next middleware
 *  @return {undefined} next - when next is call or response send
 */
function getWebsite(req, res, next){

  if(req.url.pathname !== '/get'){

    return next();

  }

  if(!checkGetAddressParams(req.url.query.address) ){

    res.writeHead(400);
    return res.end('Address url incorrect');

  }

  const pageExecutorRequest = `${config.PageExecutor.address}:${config.PageExecutor.port}/get?address=${req.url.query.address}`;
  const startTimePageExecutor = Date.now();

  getPureHtml(pageExecutorRequest).then( (data) => {

    const timePageExecutor = Date.now() - startTimePageExecutor;

    console.log(`Api process for address: ${req.url.query.address}, Time: ${timePageExecutor}m`);

    const headers = Object.assign({}, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html; charset=UTF-8'
    }, data.headers);

    res.writeHead(200, headers);

    return res.end(data.pureHtml);

  }, next);

}

module.exports = getWebsite;
