const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = require('../models/person');

const userSchema = mongoose.Schema({
    email:{
        type : String,
        unique : true,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    admin: Boolean,
    info: {
        type : personSchema
    }
}, { versionKey: false });

// pre                                                                                                                                                                         
userSchema.pre('save', function(next) {
    if(this.password) {
        var salt = bcrypt.genSaltSync(10);
        this.password  = bcrypt.hashSync(this.password, salt);
    }                                                                                   
    next()
})

module.exports = mongoose.model('User', userSchema)