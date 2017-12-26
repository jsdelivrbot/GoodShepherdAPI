'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactSchema = new Schema({
  first_given_name: {
    type: String,
    required: 'Kindly enter the first given name of the contact'
  },
  second_given_name: {
    type: String,
    required: 'Kindly enter the second given name of the contact'
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contacts', ContactSchema);
