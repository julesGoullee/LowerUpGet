'use strict';

/* eslint max-nested-callbacks: [2, 5]*/

const mockRequest = require('../pageExecutor/mock/request');

describe('Get website', () => {
  
  let mock = null;
  let getWebsite = null;
  
  before( () => {
    
    mock = mockRequest();
    getWebsite = require('../../../services/api/middlewares/getWebsite');

  });

  describe('Parse request', () => {
    
    it('Should parse simple website', (done) => {
      
      const req = {
        'url': {
          'pathname': '/get',
          'query': {
            'address': encodeURIComponent('http://google.fr')
          }
        }
      };
      
      const res = {
        'writeHead': (code, headers) => {
          
          return { code, headers };
          
        },
        'end': (body) => {
          
          expect(body).to.equal('<div></div>');
          done();
          
        }
      };
      
      const next = (err) => {
        
        console.log(err, 'err');
        
      };
      
      getWebsite(req, res, next);
      
    });
    
  });
  
  after( () => {
    
    mock.stop('request');
    
  });
  
});
