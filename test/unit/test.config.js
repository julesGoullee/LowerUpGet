'use strict';

global.chai = require('chai');
global.expect = global.chai.expect;

const spy = require('chai-spies');

global.chai.use(spy);
