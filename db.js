var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:master@localhost:5433/goodshepherddb';
var db = pgp(connectionString);

module.exports = db;

