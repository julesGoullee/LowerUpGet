'use strict';

/*eslint no-underscore-dangle:0*/

/**
 * Remove all background-image: url() in style inline
 * @param {Object} window - Current document window
 */
function removeBackgroundsUrls(window){

  const all = window.document.getElementsByTagName('*');

  for(let i = 0; i < all.length; i++){

    const htmlEl = all[i];

    htmlEl.style.removeProperty('background-image');
    htmlEl.style.removeProperty('background');

    //JsDom bug inline background property not detected:
    if(htmlEl.style && htmlEl.style._importants && typeof htmlEl.style._importants.background === 'string'){

      htmlEl.setAttribute('style', '');

    }

  }

}

module.exports = removeBackgroundsUrls;
