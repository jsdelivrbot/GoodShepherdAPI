// Contact.js

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema(
  {
    first_given_name  : String,
    second_given_name : String,
    creation_date     : Date,
  }
);

mongoose.model('Contact', contactSchema)
module.exports = mongoose.model('Contact')
