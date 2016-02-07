'use strict';

const config = require('../../../../config/config');

const apiCallUrl = `${config.frontEnd.address}/get?address=`;

/**
 * Transform url absolute or relative to api call
 * @param {String} url - source url
 * @param {String} host - source host
 * @param {String} protocol - source protocol
 * @return {String} api call url
 */
function transformUrlToLowerUpGetUrl(url, host, protocol){
  
  let validUrl = url;
  
  if(url.indexOf('/') === 0){

    validUrl = `${protocol}//${host}${url}`;

  }
  
  return `${apiCallUrl}${validUrl}`;
  
}

/**
 * Get dom attribute url switch dom type
 * @param {HTMLElement} domEl - dom element
 * @return {Boolean|String} false if attribute empty or value
 */
function getUrl(domEl){
  
  let url = false;
  
  if(domEl.tagName === 'A'){
    
    url = domEl.getAttribute('href');
    
  } else if(domEl.tagName === 'FORM'){
    
    url = domEl.getAttribute('action');

  }
  
  if(!url || url.length < 1){
    
    url = false;
    
  }
  
  return url;
  
}

/**
 * Transform relative href path value to absolute
 * @param {Object} window - Current document window
 */
function transformRelativesHrefsPaths(window){

  const links = window.document.getElementsByTagName('a');
  
  //encodeURIComponent
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  
  for(let i = 0; i < links.length; i++){
    
    const url = getUrl(links[i]);
    
    if(url){

      links[i].setAttribute('href', transformUrlToLowerUpGetUrl(url, host, protocol) );
      
    }

  }

}

/**
 * Transform relative action on form
 * @param {Object} window - Current document window
 */
function transformRelativesActionsPaths(window){

  const form = window.document.getElementsByTagName('form');
  
  //encodeURIComponent
  const protocol = window.location.protocol;
  const host = window.location.hostname;

  for(let i = 0; i < form.length; i++){

    const url = getUrl(form[i]);
    
    if(url){

      form[i].setAttribute('action', transformUrlToLowerUpGetUrl(url, host, protocol) );

    }
    
  }

}

module.exports = (window) => {
  
  transformRelativesHrefsPaths(window);
  transformRelativesActionsPaths(window);
  
};
