const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const apiRoutes = require('./api/routes/api')



mongoose.connect("mongodb://lpramirez:Xtomili2413!@democluster-shard-00-00-q6ij8.mongodb.net:27017,democluster-shard-00-01-q6ij8.mongodb.net:27017,democluster-shard-00-02-q6ij8.mongodb.net:27017/test?ssl=true&replicaSet=DemoCluster-shard-0&authSource=admin");

app.use(morgan('dev')); // request logger
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Routes which should handle request
app.use('/api', apiRoutes);
//require('./api/routes/api')(app);
require('./api/routes/user.route')(app);



module.exports = app