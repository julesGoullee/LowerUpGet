'use strict';

const fs = require('fs');
const path = require('path');

const examplesToFastedHtml = fs.readFileSync(path.join(__dirname, '../views/examplesToFasted.html') );


/**
 *  Example html page
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 *  @param {Function} next - callback for next middleware
 */
function examplesToFasted(req, res, next){

  if(req.url === '/examplesToFasted'){

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(examplesToFastedHtml);

  } else{

    next();

  }

}

module.exports = examplesToFasted;
