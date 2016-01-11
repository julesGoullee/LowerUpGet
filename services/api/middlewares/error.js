'use strict';


/**
 *  Error handler
 *  @param  {Object} req - request client
 *  @param  {Object} res - response client
 *  @param  {Function} next - next middleware (Fake for error this is the end)
 *  @param  {Error} err - Error process
 *  @return {undefined} Call when res send
 */
function error(req, res, next, err){
  
  if(err){
    
    res.writeHead(500);
    return res.end(process.env.NODE_ENV === 'production' ? '' : err.toString() );
       
  }

  res.writeHead(404);
  return res.end();

}

module.exports = error;
