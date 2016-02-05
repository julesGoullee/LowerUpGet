'use strict';

const filter = {
  'tagsNames': require('./filters/byTagsNames'),
  'styles': require('./filters/byStyles'),
  'links': require('./filters/byLinks')
};

/**
 * PageCleaner clean link, en apply style
 * @param {Window} window - window page object
 * @return {String} html - pure html string
 */
function PageCleaner(window){

  filter.tagsNames(['script', 'noscript', 'img', 'svg', 'iframe', 'style'], window);
  filter.styles(window);
  filter.links(window);

  const html = window.document.body.innerHTML;

  html.replace(/\n/g, '');

  return html;

}

module.exports = PageCleaner;
