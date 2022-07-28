const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    UserId:{
        type: String, 
    },
    message_content:{
        type: String, 
    },
    title:{
        type: String
    },
    imageUrl:{
        type: String 
    }
});

module.exports = mongoose.model('message', postSchema);