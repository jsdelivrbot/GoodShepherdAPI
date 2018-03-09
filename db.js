var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

const cn = {
    host: 'goodshepherdinst.cepumuej7bm2.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'goodshepherddb',
    user: 'luisperez',
    password: 'Xtomili2413!'
};

//var connectionString = 'postgres://postgres:master@localhost:5433/goodshepherddb';
var db = pgp(cn);

module.exports = db;

