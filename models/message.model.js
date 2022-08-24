const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({

    userId:{
        type: String,
        required: true,
    },
    name:{
        type: String, unique: true
    },
    message_content:{
        type: String, 
    },
    title:{
        type: String
    },
    imageUrl:{
        type: String 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
    
    
});

module.exports = mongoose.model('message', messageSchema);