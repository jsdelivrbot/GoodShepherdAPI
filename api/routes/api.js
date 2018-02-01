const express = require('express');
const jwt = require('jsonwebtoken');
var config = require('../../config'); // get our config file
const app = express();
app.set('superSecret', config.secret); // secret variable

const bcrypt = require('bcrypt');


const router = express.Router();
const User = require('../models/user');


// Authentication Method

router.post('/authenticate', (request, response, next) => {
    
    User.findOne({username: request.body.username}).exec()
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                var JWToken = jwt.sign({email:user.email, id:user._id}, app.get('superSecret'), {expiresIn: 1440});
                
                var userJSON = user.toJSON();
                delete userJSON.password
                response.status(200).json({
                    data: {
                        user:userJSON,
                        token:JWToken
                    },
                    success: true
                });
            }
            else {
                response.status(401).json(
                    {
                        error:{
                            code: 401,
                            message:'Authentication failed'
                        },
                        success: false
                    }
                );
            }


        } else {
            response.status(401).json(
                {
                    error:{
                        code: 401,
                        message:'Authentication failed'
                    },
                    success: false
                }
            );
        }
        
    })
    .catch(err =>{
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
});





router.use((request, response, next) => {

    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(request.headers.authorization.split(' ')[1], app.get('superSecret'), function(err, decoded) {
            if (err) {
                
                return response.json(
                    {  
                        message: 'Failed to authenticate token.' ,
                        success: false
                    }
                );    
            } else {
                console.log('encoded')
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;    
                next();
            }

        });
    }
    else {
        // if there is no token
        // return an error
        return response.status(403).send(
            {  
                message: 'No token provided.',
                success: false
            }
        );
    }

    /*

    var token = request.headers['Authorization'];
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
                console.log('encoded')
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


    */
});


/*
router.get('/', (request, response, next) => {
    response.status(200).json({
        message:'Welcome to the GoodShepherd API'
    });
});

*/

router.post('/', (request, response, next) => {
    response.status(200).json({
        message:'Welcome to the GoodShepherd API'
    });
});
















module.exports = router;