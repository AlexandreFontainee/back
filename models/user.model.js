const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
        
    name: {
      type: String, required: true, 
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'adresse email requise',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Merci de mettre une adresse email valide']
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
