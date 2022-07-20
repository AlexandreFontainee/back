const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    messageId:{
        type: String, 
    },
    message_content:{
        type: String, 
    },
    title:{
        type: String
    }
   // image:{
     //   type: image 
    //}
});

module.exports = mongoose.model('message', postSchema);