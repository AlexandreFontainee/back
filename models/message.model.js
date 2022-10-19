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

    // like dislike

    likes : {
        type : Number,
        required : true
    },

    dislikes : {
        type : Number,
        required : true
    },

    usersLiked : {
        type : [String],
        required : true
    },

    usersDisliked : {
        type : [String],
        required : true
    },
    
});

module.exports = mongoose.model('message', messageSchema);