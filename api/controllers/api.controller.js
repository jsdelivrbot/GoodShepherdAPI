const jwt = require('jsonwebtoken');
var config = require('../../config'); // get our config file


const bcrypt = require('bcrypt');
const User = require('../models/user')


exports.authenticate = function(req, res) {
   
    User.findOne({username: request.body.username}).exec()
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                var JWToken = jwt.sign({email:user.email, id:user._id}, 'masterSecret', {expiresIn: 1440});
                
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




};



exports.validate = function(req, res) {

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

};

exports.authorized = function(req, res) {

    response.status(200).json({
        message:'Welcome to the GoodShepherd API'
    });
    

};





