const backstop = require('backstopjs');
const {getConfig} = require('./util');

// const runType = 'reference'; // test || reference
const runType = 'test'; // test || reference

getConfig().then(config => backstop(runType, {config})).then(() => console.log('BackStopJS => done'));
