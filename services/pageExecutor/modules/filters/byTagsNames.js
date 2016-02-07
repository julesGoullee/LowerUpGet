'use strict';

/**
 * Remove all specific tagsNames
 * @param {Object} window - Current document window
 * @param {Array} tagsNames - Array of Name tag to remove
 */
function removeAllElementsByTagsNames(window, tagsNames){

  for(const tagName of tagsNames){

    const tags = window.document.getElementsByTagName(tagName);

    for(let i = 0; i < tags.length; i++){

      tags[i].parentNode.removeChild(tags[i]);

    }

  }

}

module.exports = removeAllElementsByTagsNames;
