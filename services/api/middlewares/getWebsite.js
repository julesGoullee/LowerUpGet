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

  // T.ODO check url.query.address
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

      if(err){

        return reject(`code: ${err.code}, error: ${err}`);

      }

      if(resPageExecutor.statusCode !== 200){

        const errPageExecutor = new Error(`Error PageExecutor: code: ${resPageExecutor.statusCode}, body: ${pureHtml}`);

        return reject(`code: errPageExecutor, error: ${errPageExecutor}`);

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
 * Return clean parts url
 * @param {Array} urlFrag - splice / array of url
 * @return {Object} decode address, path, params
 */
function decodeUrl(urlFrag){
  
  const address = decodeURIComponent(urlFrag[2]);
  
  let path = '';
  let params = '';
  
  if(urlFrag[3] && urlFrag[3].length > 1){
    
    if(urlFrag[3].indexOf('?') === 0){
      
      params = urlFrag[3];
      
    } else{
     
      const pathAndParams = urlFrag[3].split('?');
      
      path = decodeURIComponent(pathAndParams[0]);

      if(pathAndParams[1] && pathAndParams[1].length > 1){

        params = `?${pathAndParams[1]}`;

      }
      
    }
    
  }

  return { address, path, params };
  
}

/**
 *  Call pageExecutor service
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 *  @param {Function} next - callback for next middleware
 *  @return {undefined} next - when next is call or response send
 */
function getWebsite(req, res, next){

  const urlFrag = req.url.split('/');
  
  if(urlFrag.length < 3 || urlFrag[1] !== 'get'){

    return next();

  }
  
  if(!checkGetAddressParams(urlFrag[2]) ){

    res.writeHead(400);
    return res.end('Address url incorrect');

  }

  const decodedUrl = decodeUrl(urlFrag);
  const stringUrl = `${decodedUrl.address}${decodedUrl.path}${decodedUrl.params}`;
  const pageExecutorRequest = `${config.PageExecutor.address}:${config.PageExecutor.port}/get?address=${stringUrl}`;
  
  const startTimePageExecutor = Date.now();

  getPureHtml(pageExecutorRequest).then( (data) => {

    const timePageExecutor = Date.now() - startTimePageExecutor;

    console.log(`Api process for address: ${stringUrl}, Time: ${timePageExecutor}m`);

    const headers = Object.assign({}, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html; charset=UTF-8'
    }, data.headers);

    res.writeHead(200, headers);

    return res.end(data.pureHtml);

  }, next);

}

module.exports = getWebsite;
