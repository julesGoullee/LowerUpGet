'use strict';


const Url = require('url');

/**
 *  UrlParser for request api
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 *  @param {Function} next - callback for next middleware
 */
function urlParse(req, res, next){

  req.url = Url.parse(req.url, '?');
  next();

}

module.exports = urlParse;
