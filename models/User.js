var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    userName: String,
    email: String,
    password: String
});

userSchema.pre('save', function(next){
    var user = this;
    
    // only hash password if it is new
    if(!user.isNew) return next();
    
    if(!user.password) return next();

    // hashing the password with 10 rounds of salt generation
    bcrypt.hash(
        user.password, 
        10, 
        function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
    });
});

module.exports = mongoose.model('User',userSchema);