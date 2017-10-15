/* global describe, it, before, after, beforeEach, afterEach, process */
const {assert} = require('chai');
const util = require('./test-util');
const seUtil = require('./se-util');
const mainData = require('./../main-data/data.json');
const addContext = require('mochawesome/addContext');
const {SeleniumServer} = require('selenium-webdriver/remote');
const DESKTOP_SERVER_PORT = 4444;

const SERVER_PORT = process.env.SERVER_PORT || DESKTOP_SERVER_PORT; // eslint-disable-line no-process-env
const OS_NAME = util.detectOsName();
const IS_MOBILE = SERVER_PORT !== DESKTOP_SERVER_PORT;
const SITE_URL = mainData.url.host;
const WEB_DRIVER_SERVER_URL = 'http://localhost:' + SERVER_PORT + '/wd/hub';

const server = new SeleniumServer('./driver/selenium-server-standalone-3.0.1.jar', {
    port: SERVER_PORT,
    jvmArgs: ['-Dwebdriver.chrome.driver=./driver/' + OS_NAME + '/chromedriver']
});

const WebDriver = require('selenium-webdriver');
const until = WebDriver.until;
const byCss = WebDriver.By.css;
let driver = null;

describe('Selenium test', function seleniumTestDescribe() {
    // each test should be less than 25s

    // TODO: see cli-test, do the same
/*
    it('check categories', () =>
        checkCategories()
            .then(errors => assert.equal(errors.length, 0))
    ).timeout(5e3);
*/
    this.timeout(25e3); // eslint-disable-line no-invalid-this

    if (!IS_MOBILE) {
        before(() => server.start());
    }

    after(() => server.stop());

    beforeEach(() => {
        driver = new WebDriver
            .Builder()
            .usingServer(WEB_DRIVER_SERVER_URL)
            .withCapabilities({browserName: 'chrome'})
            .build();

        return IS_MOBILE || seUtil.screen.setSize(driver, 1024, 768);
    });

    afterEach(() => driver.quit());

    const now = Date.now();

    it('Register', function Register() {
        driver.get(SITE_URL);

        driver
            .findElement(byCss('a[href="/authorization"]')).click();

        driver.findElement(byCss('input[name="email"]')).sendKeys('test-user-' + now + '@gmail.com');
        driver.findElement(byCss('input[name="password"]')).sendKeys('123456');

        driver.findElement(byCss('.js-register')).click();

        driver.wait(until.elementLocated(byCss('a[href="/api/logout"]')), 5e3)
            .then(elem => elem.isDisplayed())
            .then(isDisplayed => assert(isDisplayed, 'Element is NOT displayed'));

        seUtil.screen
            .ofSelector(driver, '.header')
            .then(image =>
                addContext(this, {
                    title: 'Header',
                    value: util.createTag('img', 'src="' + image + '"')
                })
            );

        return driver.sleep(1000);
    });

    it('Login', function Login() {
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
