const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

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
    
});

module.exports = mongoose.model('message', messageSchema);