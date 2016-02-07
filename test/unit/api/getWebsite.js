'use strict';

/* eslint max-nested-callbacks: [2, 5]*/

const config = require('../../../config/config');
const apiCallUrl = `${config.frontEnd.address}/get?address=`;
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
          'pathname': `/get/${encodeURIComponent('http://google.fr')}`
        }
      };
      
      const spyRequest = chai.spy.on(mock._request, 'get');
      const spyNext = chai.spy();
      
      const res = {
        'writeHead': (code, headers) => {
          
          return { code, headers };
          
        },
        'end': (body) => {

          expect(body).to.equal('<div></div>');
          expect(spyRequest).have.been.called.exactly(1).with(`${apiCallUrl}http://google.fr`);
          expect(spyNext).not.have.been.called();
          done();
          
        }
      };
            
      getWebsite(req, res, spyNext);
      
    });

    it('Should parse website with path', (done) => {

      const req = {
        'url': {
          'pathname': `/get/${encodeURIComponent('https://stackoverflow.com')}/${encodeURIComponent('/questions/16607039/in-mocha-testing-while')}`
        }
      };

      const spyRequest = chai.spy.on(mock._request, 'get');
      const spyNext = chai.spy();

      const res = {
        'writeHead': (code, headers) => {

          return { code, headers };

        },
        'end': (body) => {

          expect(body).to.equal('<div></div>');
          expect(spyRequest).have.been.called.exactly(1).with(`${apiCallUrl}https://stackoverflow.com/questions/16607039/in-mocha-testing-while`);
          expect(spyNext).not.have.been.called();
          done();

        }
      };

      getWebsite(req, res, spyNext);

    });
    
  });
  
  after( () => {
    
    mock._require.stop('request');
    
  });
  
});
