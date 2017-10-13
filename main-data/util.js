const request = require('request');

function getUrl(url) {
    return new Promise((resolve, reject) =>

        /*
        request.get(url)
            .on('error', reject)
            .on('response', response =>
                response.statusCode === 200 ?
                    resolve(response) :
                    reject(response)
            )
*/

        request(url, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }

            if (response && response.statusCode !== 200) {
                reject(response);
                return;
            }

            resolve(body);
        })
    );
}

module.exports.getUrl = getUrl;
