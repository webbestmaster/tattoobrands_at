const mainData = require('./../main-data/data.json');
const {getUrl} = require('./../main-data/util');

// return promise with/without error
function checkLinks() {
    return getUrl(mainData.url.host + mainData.url.checkAllLinks)
        .then(rawLinks => {
            const links = JSON.parse(rawLinks);
            const errors = [];

            links.forEach(item =>
                item.error && errors.push(Object.assign(item))
            );

            return errors;
        });
}

module.exports.checkLinks = checkLinks;
