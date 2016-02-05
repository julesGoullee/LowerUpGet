'use strict';

/**
 * Remove all specific tagsNames
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

module.exports = removeAllElementsByTagsNames;
