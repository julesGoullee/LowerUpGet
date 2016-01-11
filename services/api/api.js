'use strict';

const http = require('http');
const config = require('../../config/config');

const middlewaresError = require('./middlewares/error');
const port = process.env.PORT || config.frontEnd.port;
const middlewares = new Set();

middlewares.add(require('./middlewares/parser') );
middlewares.add(require('./middlewares/example') );
middlewares.add(require('./middlewares/getWebsite') );
middlewares.add(middlewaresError);

/**
 *  Launch series middlewares
 *  @param {Object} req - request client
 *  @param {Object} res - response client
 *  @param {Array} currentMiddleware - callback for next middleware
 *  @param {Iterator} middlewaresIterator - Entries of middlewaresIterator
 *  @return {Boolean} When last middleware
 */
function execMiddlewares(req, res, currentMiddleware, middlewaresIterator){
  
  if(currentMiddleware.done){
    
    return false;
    
  }

  console.log(`Exec middleware ${currentMiddleware.value[1].name}`);

  currentMiddleware.value[1](req, res, (err) => {
    
    if(err){
      
      return middlewaresError(req, res, Function, err);
      
    }
    
    execMiddlewares(req, res, middlewaresIterator.next(), middlewaresIterator);
    
  });

}

http.createServer( (req, res) => {

  const middlewaresIterator = middlewares.entries();
  
  execMiddlewares(req, res, middlewaresIterator.next(), middlewaresIterator);

}).listen(port, () => {

  console.log(`Api Listen at pid ${process.pid} on ${config.frontEnd.address}:${port}`);

});
