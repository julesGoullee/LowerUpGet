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

    it('Should rm style inline after execute', (done) => {

      const page = `<div></div><style>.pmoabs{background-color:#fff;border:1px solid #E5E5E5;color:#666;font-size:13px;}</style>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div></div>`);
        done();

      });

    });

    it('Should rm inline-style background image', (done) => {

      const page = `<div style="background-image: url('http://google.fr/logo.png');"></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div style=""></div>`);
        done();

      });

    });
    
    it('Should transform relative path in link href', (done) => {

      const page = `<a href="/search?blabla=1"></a>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<a href="about:///search?blabla=1"></a>`);
        done();

      });

    });

    it('Should transform relative action in form', (done) => {

      const page = `<form action="/action"></form>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<form action="about:///action"></form>`);
        done();

      });

    });
    
  });

});
