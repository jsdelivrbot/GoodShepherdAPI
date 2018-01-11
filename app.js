const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

const app = express();

mongoose.connect("mongodb://lpramirez:Xtomili2413!@democluster-shard-00-00-q6ij8.mongodb.net:27017,democluster-shard-00-01-q6ij8.mongodb.net:27017,democluster-shard-00-02-q6ij8.mongodb.net:27017/test?ssl=true&replicaSet=DemoCluster-shard-0&authSource=admin");

app.use(morgan('dev')); // request logger
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

/*
app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
*/

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message,
            code: error.status 
        }
    });
});

module.exports = app