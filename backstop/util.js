const {getUrl} = require('./../main-data/util');
const mainData = require('./../main-data/data.json');

const config = {
    id: 'test-for-styles',
    viewports: [
        {
            name: 'desktop',
            width: 1024,
            height: 768
        },
        {
            name: 'tablet',
            width: 786,
            height: 1024
        },
        {
            name: 'phone',
            width: 320,
            height: 480
        }
    ],
    scenarios: [
        {
            label: 'main',
            url: mainData.url.host,
            selectors: [
                '.header',
                '.header-nav',
                '.footer'
            ],
            delay: 0
        }
    ],
    paths: {
        bitmaps_reference: 'bitmap/reference', // eslint-disable-line camelcase
        bitmaps_test: 'bitmap/test', // eslint-disable-line camelcase
        html_report: 'report/html', // eslint-disable-line camelcase
        ci_report: 'report/ci', // eslint-disable-line camelcase,
        casper_scripts: 'engine-scripts' // eslint-disable-line camelcase
    },
    casperFlags: [],
    engine: 'chrome',
    report: [
        'browser'
    ],
    debug: false
};

const scenarioSource = {
    label: '',
    url: mainData.url.host,
    selectors: [],
    removeSelectors: [],
    hideSelectors: [],
    delay: 0
};

function getEmptyScenario() {
    return JSON.parse(JSON.stringify(scenarioSource));
}

function createCategoryScenario(link) {
    const scenario = getEmptyScenario();

    scenario.selectors.push('.main-wrapper > .width-limiter');

    return Object.assign(scenario, {
        url: scenario.url + link,
        label: link
    });
}

function createProductScenario(link) {
    const scenario = getEmptyScenario();

    scenario.selectors.push('.main-wrapper > .width-limiter');

    return Object.assign(scenario, {
        url: scenario.url + link,
        label: link
    });
}

function getConfig() {
    return getUrl(mainData.url.host + mainData.url.getAllLinks).then(rawLinks => {
        const {links} = JSON.parse(rawLinks);
        const {categories, products} = links;

        config.scenarios = config.scenarios
            .concat(
                categories.map(createCategoryScenario),
                products.filter((product, ii) => !(ii % 50)).map(createProductScenario)
            );

        return config;
    });
}

module.exports.getConfig = getConfig;
