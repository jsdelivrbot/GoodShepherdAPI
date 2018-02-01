const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username:{
        type : String,
        unique : true,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    admin: Boolean
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