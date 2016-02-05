'use strict';

const config = require('../../../../config/config');

/**
 * tranform relative href path value to absolute
 * @param {Object} window - Current document window
 */
function transformRelativesHrefsPaths(window){

  const links = window.document.getElementsByTagName("a");
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  
  for (let i = 0; i < links.length; i++) {
      
    if (links[i].getAttribute('href').indexOf('/') === 0){
      
      links[i].setAttribute('href', `http://localhost:4000/get?address=${protocol}//${host}${links[i].getAttribute('href')}`);
      
    }

  }

}

/**
 * Transform relative action on form
 * @param {Object} window - Current document window
 */
function transformRelativesActionsPaths(window){

  const form = window.document.getElementsByTagName("form");
  //encodeURIComponent
  const protocol = window.location.protocol;
  const host = window.location.hostname;

  for (let i = 0; i < form.length; i++) {

    if (form[i].getAttribute('action').indexOf('/') === 0){

      form[i].setAttribute('action', `http://localhost:4000/get?address=${protocol}//${host}${form[i].getAttribute('action')}`);

    }

  }

}

module.exports = (window) => {

  transformRelativesActionsPaths(window);
  transformRelativesHrefsPaths(window);

};
