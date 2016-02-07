'use strict';

const FilterByTagsNames = require('./filters/byTagsNames');
const FilterByLinks = require('./filters/byLinks');
const FilterByStyles = require('./filters/byStyles');

const filter = {
  'tagsNames': FilterByTagsNames,
  'styles': FilterByStyles,
  'links': FilterByLinks
};

/**
 * PageCleaner clean link, en apply style
 * @param {Window} window - window page object
 * @return {String} html - pure html string
 */
function PageCleaner(window){
  
  filter.tagsNames(window, ['script', 'noscript', 'link', 'img', 'svg', 'iframe', 'style']);
  filter.styles(window);
  filter.links(window);

  const html = window.document.body.innerHTML;

  html.replace(/\n/g, '');

  return html;

}

module.exports = PageCleaner;
