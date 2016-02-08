'use strict';

/* eslint max-nested-callbacks: [2, 5]*/

const jsdom = require('jsdom');

const config = require('../../../config/config');
const apiCallUrl = `${config.frontEnd.address}/get/`;
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

    it('Should rm link', (done) => {

      const page = `<div><link rel="stylesheet" type="text/css" href="https://images-na.ssl-images-amazon.com/style.css"></div>`;

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

    it('Should rm inline-style background image only this property define', (done) => {

      const page = `<div style="background-image: url('http://google.fr/logo.png');"></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div style=""></div>`);
        done();

      });

    });

    it('Should rm inline-style correct background image only this property', (done) => {

      const page = `<div style="background-image: url('http://google.fr/logo.png')"></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div style=""></div>`);
        done();

      });

    });

    it('Should rm inline-style correct background image and multiple property', (done) => {

      const page = `<div style="background-image: url('http://google.fr/logo.png');height:37px;width:95px;display:block"></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div style="height: 37px; width: 95px; display: block;"></div>`);
        done();

      });

    });

    it('Should rm inline-style background image without url quote(jsdom bug)', (done) => {

      const page = `<div style="background:url(/images/nav_logo229.png);height:37px;width:95px;display:block"></div>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<div style=""></div>`);
        done();

      });

    });

  });

  describe('transform href, form, a address', () => {

    it('Should transform absolute path in link href', (done) => {

      const page = `<a href="http://google.fr"></a>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<a href="${apiCallUrl}http%3A%2F%2Fgoogle.fr"></a>`);
        done();

      });

    });

    it('Should transform absolute path with params in link href', (done) => {

      const page = `<a href="http://google.fr?blabla=1"></a>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<a href="${apiCallUrl}http%3A%2F%2Fgoogle.fr?blabla=1"></a>`);
        done();

      });

    });
    
    it('Should ignore invalide path in link href', (done) => {

      const page = `<a ></a>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<a></a>`);
        done();

      });

    });
    
    it('Should transform relative path in link href', (done) => {

      const page = `<a href="/search"></a>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<a href="${apiCallUrl}about%3A%2F%2F/%2Fsearch"></a>`);
        done();

      });

    });

    it('Should transform relative path with params in link href', (done) => {

      const page = `<a href="/search?blabla=1"></a>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<a href="${apiCallUrl}about%3A%2F%2F/%2Fsearch?blabla=1"></a>`);
        done();

      });

    });
    
    it('Should transform relative path action in form', (done) => {

      const page = `<form action="/action"></form>`;

      getWindow(page, (html) => {

        expect(html).to.equal(`<form action="${apiCallUrl}about%3A%2F%2F/%2Faction" method="GET"></form>`);
        done();

      });

    });
    
  });
  
});
