'use strict';

const jsdom = require('jsdom');
const Promise = require('bluebird');


/**
 * Represents a book.
 * @param {Array} tagsNames - Array of Name tag to remove
 * @param {Object} window - Current document window
 */
function removeAllElementsByTagsNames(tagsNames, window){

  for(const tagName of tagsNames){

    const tags = window.document.getElementsByTagName(tagName);

    for(let i = 0; i < tags.length; i++){

      tags[i].parentNode.removeChild(tags[i]);

    }

  }

}

module. exports = (address) => {

  return new Promise( (resolve, reject) => {

    jsdom.env({
      'url': address,
      'features': {
        'FetchExternalResources': ['script', 'link'],
        'ProcessExternalResources': ['script', 'link']
      },
      'done': (err, window) => {

        if(err){

          return reject(err);

        }

        // let originaleTime = new Date( (Date.now() - window.times));

        removeAllElementsByTagsNames(['script', 'noscript', 'img', 'svg', 'iframe'], window);

        const content = window.document.body.innerHTML;

        window.close();
        return resolve(content);

      },
      'created': (err, window) => {

        if(err){

          return reject(err);

        }
        window.times = Date.now();

      }

    });

  });

};
