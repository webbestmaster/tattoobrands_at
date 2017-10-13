/* global describe, it */

const {checkStore} = require('./../cli/check-store');
const {checkLinks} = require('./../cli/check-links');
const {assert} = require('chai');

describe('cli tests', () => {
    it('check store', () =>
        checkStore()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(60e3 * 5);

    it('check all links', () =>
        checkLinks()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(60e3 * 5);
});
