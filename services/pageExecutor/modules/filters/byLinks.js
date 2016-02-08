'use strict';

const config = require('../../../../config/config');
const Url = require('url');

const apiCallUrlBase = `${config.frontEnd.address}/get/`;

/**
 * Create url to call api
 * @param {String} address - url address
 * @param {String} path - url path
 * @param {String} params - url params
 * @return {String} url encoded
 */
function encodeUrl(address, path, params){
  
  let apiCall = apiCallUrlBase + encodeURIComponent(address);
  
  if(path){
    
    apiCall += `/${encodeURIComponent(path)}`;

  }
  
  if(params){

    apiCall += params;

  }
  
  return apiCall;

}

/**
 * Transform url absolute or relative to api call
 * @param {Object} url - source url parsed
 * @param {String} host - source host
 * @param {String} protocol - source protocol
 * @return {String} api call url
 */
function transformUrlToLowerUpGetUrl(url, host, protocol){
  
  let path = '';
  let params = '';
  let address = '';
  
  if(url.href && url.href.indexOf('/') === 0){
    
    address = `${protocol}//${host}`;

  } else{
    
    address = `${url.protocol}//${url.host}`;
    
  }
  
  if(url.pathname && url.pathname.length > 1){

    path = url.pathname;

  }
  
  if(url.search && url.search.length > 1){
    
    params = url.search;
        
  }
  
  return encodeUrl(address, path, params);
  
}

/**
 * Get dom attribute url switch dom type
 * @param {HTMLElement} domEl - dom element
 * @return {Boolean|Object} false if attribute empty or url object parse
 */
function getUrl(domEl){
  
  let url = false;
  
  if(domEl.tagName === 'A'){
    
    url = domEl.getAttribute('href');
    
  } else if(domEl.tagName === 'FORM'){

    url = domEl.getAttribute('action');
    domEl.setAttribute('method', 'GET');

  }
  
  if(!url || url.length < 1){
    
    url = false;
    
  } else{
    
    url = Url.parse(url, '?');
    
  }
  
  return url;
  
}

/**
 * Transform relative href path value to absolute
 * @param {Object} window - Current document window
 */
function transformRelativesHrefsPaths(window){

  const links = window.document.getElementsByTagName('a');
  
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  
  for(let i = 0; i < links.length; i++){
    
    const url = getUrl(links[i]);
    
    if(url){

      const apiCallUrl = transformUrlToLowerUpGetUrl(url, host, protocol);
      
      links[i].setAttribute('href', apiCallUrl);
      
    }

  }

}

/**
 * Transform relative action on form
 * @param {Object} window - Current document window
 */
function transformRelativesActionsPaths(window){

  const form = window.document.getElementsByTagName('form');
  
  const protocol = window.location.protocol;
  const host = window.location.hostname;

  for(let i = 0; i < form.length; i++){

    const url = getUrl(form[i]);
    
    const apiCallUrl = transformUrlToLowerUpGetUrl(url, host, protocol);
    
    if(apiCallUrl){

      form[i].setAttribute('action', apiCallUrl);

    }
    
  }

}

module.exports = (window) => {
  
  transformRelativesHrefsPaths(window);
  transformRelativesActionsPaths(window);
  
};
