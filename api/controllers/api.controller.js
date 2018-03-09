const jwt = require('jsonwebtoken');
var config = require('../../config'); // get our config file


const bcrypt = require('bcrypt');



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





