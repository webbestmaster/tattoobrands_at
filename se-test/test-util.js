/* global process */
const fs = require('fs'); // eslint-disable-line id-length
const dot = require('dot');

const createTagGenerator = dot.template(
    '<{{= it.tagName }}' +
    '{{~it.attributeList :value:index}}' +
    '{{= index % 2 ? (value + \'"\') : (\' \' + value + \'="\') }}' +
    '{{~}}' +
    '></{{= it.tagName }}>'
);

const util = {
    createTag: (tagName, attributeList) => createTagGenerator({
        tagName,
        attributeList
    }),
    detectOsName: () => {
        const platformName = process.platform;

        if (/darwin/.test(platformName)) {
            return 'darwin';
        }

        if (/linux/.test(platformName)) {
            return 'linux';
        }

        throw new Error('Can NOT detect OS!');
    }
};

module.exports = util;
