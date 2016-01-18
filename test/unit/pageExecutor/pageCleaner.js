'use strict';

/* eslint max-nested-callbacks: [2, 5]*/

const jsdom = require('jsdom');

const pageCleaner = require('../../../services/pageExecutor/modules/pageCleaner');

/**
 * Simulate fetch address
 * @param {String} html - content page
 * @param {Function} cb - callback after page load
 */
function getWindow(html, cb){

  jsdom.env({
    'html': html,
    'features': {
      'FetchExternalResources': ['script', 'link'],
      'ProcessExternalResources': ['script', 'link']
    },
    'done': (err, window) => {

      if(err){

        throw err;

      }

      cb(pageCleaner(window) );

    }
  });

}

describe('Page Cleaner', () => {

  describe('Remove balises', () => {

    it('Should rm img', (done) => {

      const page = `<div><img alt="@kasperisager" class="avatar" height="20" src="" width="20" /></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div></div>`);
        done();

      });

    });

    it('Should rm iframe', (done) => {

      const page = `<div><iframe src=""></iframe></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div></div>`);
        done();

      });

    });

    it('Should rm script files link', (done) => {

      const page = `<div><script src="" ></script></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div></div>`);
        done();

      });

    });

    it('Should rm script inline after execute', (done) => {

      const page = `<div></div><script> document.getElementsByTagName('div')[0].innerHTML='<div>Add balise</div>';</script>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div><div>Add balise</div></div>`);
        done();

      });

    });

  });

});
