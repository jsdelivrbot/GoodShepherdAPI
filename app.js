const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')
const apiRoutes = require('./api/routes/api')

const app = express();

mongoose.connect("mongodb://lpramirez:Xtomili2413!@democluster-shard-00-00-q6ij8.mongodb.net:27017,democluster-shard-00-01-q6ij8.mongodb.net:27017,democluster-shard-00-02-q6ij8.mongodb.net:27017/test?ssl=true&replicaSet=DemoCluster-shard-0&authSource=admin");

app.use(morgan('dev')); // request logger
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Routes which should handle request
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);



/*
app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
*/

/*
app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message,
            code: error.status 
        }
    });
});
*/

apiRoutes.use((request, response, next) => {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return response.json(
                    {  
                        message: 'Failed to authenticate token.' ,
                        success: false
                    }
                );    
            } else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;    
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return response.status(403).send(
            {  
                message: 'No token provided.',
                success: false
            }
        );
    }
});

app.use('/api', apiRoutes);

module.exports = app