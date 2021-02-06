const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

// Fire a function after user saved to database
userSchema.post('save', function(doc, next) {
    console.log('New user created and saved, ' + doc)
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;
