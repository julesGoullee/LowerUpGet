'use strict';


const Url = require('url');
const http = require('http');

const config = require('../../../config/config');


module.exports = (cb) => {

  http.createServer( (req, res) => {

    const url = Url.parse(req.url, '?');

    if(url.pathname === '/get' && url.query.address){

      cb(url.query.address).then( (htmlContent) => {

        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Content-length': Buffer.byteLength(htmlContent, 'utf-8')
        });

        res.write(htmlContent);
        res.end();

      }).catch( (err) => {

        res.writeHead(500, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Content-length': Buffer.byteLength(err.toString(), 'utf-8')
        });
        
        res.end(err.toString() );

      });

    } else{

      res.writeHead(400);
      res.end('incorrect path or url');

    }

  }).listen(config.PageExecutor.port, () => {

    console.log(`Page executor worker listen at pid ${process.pid} on ${config.PageExecutor.address}:${config.PageExecutor.port}`);

  });

};
