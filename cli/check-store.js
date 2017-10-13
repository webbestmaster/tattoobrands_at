const mainData = require('./../main-data/data.json');
const {getUrl} = require('./../main-data/util');

// return promise with/without error
function checkStore() {
    return getUrl(mainData.url.host + mainData.url.checkStore)
        .then(rawStoreState => {
            const storeState = JSON.parse(rawStoreState);
            const errors = [];

            Object
                .keys(storeState)
                .forEach(arrayName =>
                    storeState[arrayName]
                        .forEach(item =>
                            item.error && errors.push(Object.assign(item, {arrayName}))
                        )
                );

            return errors;
        });
}

module.exports.checkStore = checkStore;
