/* global describe, it */

const {checkStore} = require('./../cli/check-store');
const {assert} = require('chai');

describe('check store', () => {
    it('should return no errors', () =>
        checkStore()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(10e3);
});
