const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
        
    name: {
      type: String, required: true, unique: true
    },
    email: {
        type : String , required: true, unique: true,
    },
    password: {
        type: String, required: [true, "veuillez saisir un mot de passe"]
    },
    userImageUrl:{
        type: String,
    },
    IsAdmin:{
        type: Boolean,
        default: false
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }],

});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema );
