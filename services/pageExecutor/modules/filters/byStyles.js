'use strict';

/**
 * Remove all background-image: url() in style inline
 * @param {Object} window - Current document window
 */
function removeBackgroundsUrls(window){

  const all = window.document.getElementsByTagName('*');

  for(let i = 0; i < all.length; i++){

    all[i].style.removeProperty('background-image');
    all[i].style.removeProperty('background');
    
  }

}

module.exports = removeBackgroundsUrls;
