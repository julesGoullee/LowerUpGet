'use strict';

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

/**
 * PageCleaner clean link, en apply style
 * @param {Window} window - window page object
 * @return {String} html - pure html string
 */
function PageCleaner(window){

  removeAllElementsByTagsNames(['script', 'noscript', 'img', 'svg', 'iframe'], window);

  const html = window.document.body.innerHTML;

  html.replace(/\n/g, '');

  return html;

}

module.exports = PageCleaner;
