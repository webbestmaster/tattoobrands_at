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

function getAllLinks() {
    return getUrl(mainData.url.host + mainData.url.getAllLinks)
        .then(rawLinks => JSON.parse(rawLinks).links);
}

function checkLinksInChain(links) {
    const errors = [];

    let chain = Promise.resolve();

    links.forEach(link => {
        chain = chain.then(() => getUrl(mainData.url.host + link)
            .then(() => console.log('GOOD -->', link))
            .catch(() => {
                console.error('BAD -->', link);
                errors.push(link);
            })
        );
    });

    return chain.then(() => errors);
}


function checkOrders() {
    return getAllLinks().then(({orders}) => checkLinksInChain(orders));
}

module.exports.checkOrders = checkOrders;


function checkProducts() {
    return getAllLinks().then(({products}) => checkLinksInChain(products));
}

module.exports.checkProducts = checkProducts;


function checkCategories() {
    return getAllLinks().then(({categories}) => checkLinksInChain(categories));
}

module.exports.checkCategories = checkCategories;


function checkStaticPages() {
    return checkLinksInChain(mainData.url.staticPages);
}

module.exports.checkStaticPages = checkStaticPages;
