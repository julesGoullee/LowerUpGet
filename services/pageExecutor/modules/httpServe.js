'use strict';


const http = require('http');

const config = require('../../../config/config');


module.exports = (cb) => {

  http.createServer( (req, res) => {

    if(req.url.indexOf('/get?address=') === 0){

      const requestUrl = req.url.slice(13, req.url.length);

      cb(requestUrl).then( (htmlContent) => {

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
