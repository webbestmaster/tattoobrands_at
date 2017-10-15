/* global describe, it */

const {checkStore} = require('./../cli/check-store');
const {checkCategories, checkOrders, checkProducts, checkStaticPages} = require('./../cli/check-links');
const {assert} = require('chai');

describe('cli tests', () => {
    it('check store', () =>
        checkStore()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(5e3);


    it('check categories', () =>
        checkCategories()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(5e3);


    it('check orders', () =>
        checkOrders()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(5e3);


    it('check static pages', () =>
        checkStaticPages()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(5e3);

    console.warn(' ---> Enable test for Product links');

    it('check products', () =>
        checkProducts()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(60e3 * 10);
});
