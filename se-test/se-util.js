function setScreenSize(driver, width, height) {
    return driver.manage().window().setSize(width, height);
}

module.exports.setScreenSize = setScreenSize;
