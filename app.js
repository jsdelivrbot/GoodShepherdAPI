const express = require('express'); // express is a function that is returned when require is used
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next)=>{
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message,
            code: error.status 
        }
    });
});

module.exports = app