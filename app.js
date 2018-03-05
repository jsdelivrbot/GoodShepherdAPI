const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const apiRoutes = require('./api/routes/api')



app.use(morgan('dev')); // request logger
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())



app.use('/api', apiRoutes);
require('./api/routes/user.route')(app);


module.exports = app