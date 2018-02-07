

const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    userID      : {type : String, required : true},
    firstName   : {type : String, required : true},
    lastName    : {type : String, required : true},
    email       : {type : String, required : true}
}, { versionKey: false });

module.exports = mongoose.model('Person', personSchema)