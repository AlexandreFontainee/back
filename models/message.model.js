// MON SHCEMA DE MESSAGE

const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({

    userId:{
        type: String,   
    },
    userImageUrl: {
        type: String
    },
    name:{
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
    },
    
});

module.exports = mongoose.model('message', messageSchema);