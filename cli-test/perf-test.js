const mainData = require('./../main-data/data.json');

const cluster = require('cluster');
const loadtest = require('loadtest');
let numWorkers = 0;
let ii = 0;

if (cluster.isMaster) {
    numWorkers = require('os').cpus().length;

    for (ii = 0; ii < numWorkers; ii += 1) {
        cluster.fork();
    }

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    cluster.on('online', worker => console.log('Worker ' + worker.process.pid + ' is online'));
    return;
}

const options = {
    url: mainData.url.host,
    maxRequests: 25
};

loadtest.loadTest(options, (error, result) => error ?
    console.error('Got an error: %s', error) :
    console.log('\n-= Perf test result =-\n', result)
);

