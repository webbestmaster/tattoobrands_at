/* global describe, it, before, after, beforeEach, afterEach */
const {assert} = require('chai');
const util = require('./test-util');
const seUtil = require('./se-util');
const mainData = require('./../main-data/data.json');
const addContext = require('mochawesome/addContext');

const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

const PORT = 4444;
const OS_NAME = util.detectOsName();

const SITE_URL = mainData.url.host;
const WEB_DRIVER_SERVER_URL = 'http://localhost:' + PORT + '/wd/hub';

const server = new SeleniumServer('./driver/selenium-server-standalone-3.0.1.jar', {
    port: PORT,
    jvmArgs: ['-Dwebdriver.chrome.driver=./driver/' + OS_NAME + '/chromedriver']
});

const WebDriver = require('selenium-webdriver');
const until = WebDriver.until;
const byCss = WebDriver.By.css;
let driver = null;

describe('Selenium test', function seleniumTestDescribe() {
    // each test should be less than 10s
    this.timeout(25e3); // eslint-disable-line no-invalid-this

    before(() => server.start());

    after(() => server.stop());

    beforeEach(() => {
        driver = new WebDriver
            .Builder()
            .usingServer(WEB_DRIVER_SERVER_URL)
            .withCapabilities({browserName: 'chrome'})
            .build();

        return seUtil.setScreenSize(driver, 1024, 768);
    });

    afterEach(() => driver.quit());

    const now = Date.now();

    it('Register', () => {
        driver.get(SITE_URL);

        driver
            .findElement(byCss('a[href="/authorization"]')).click();

        driver.findElement(byCss('input[name="email"]')).sendKeys('test-user-' + now + '@gmail.com');
        driver.findElement(byCss('input[name="password"]')).sendKeys('123456');

        driver.findElement(byCss('.js-register')).click();

        driver.wait(until.elementLocated(byCss('a[href="/api/logout"]')), 5e3)
            .then(elem => elem.isDisplayed())
            .then(isDisplayed => assert(isDisplayed, 'Element is NOT displayed'));

        return driver.sleep(1000);
    });

    it('Login', () => {
        driver.get(SITE_URL);

        driver
            .findElement(byCss('a[href="/authorization"]')).click();

        driver.findElement(byCss('input[name="email"]')).sendKeys('test-user-' + now + '@gmail.com');
        driver.findElement(byCss('input[name="password"]')).sendKeys('123456');

        driver.findElement(byCss('.js-login')).click();

        driver.wait(until.elementLocated(byCss('a[href="/api/logout"]')), 5e3)
            .then(elem => elem.isDisplayed())
            .then(isDisplayed => assert(isDisplayed, 'Element is NOT displayed'));

        return driver.sleep(1000);
    });
});
