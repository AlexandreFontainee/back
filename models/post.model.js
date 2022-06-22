const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId:{
        type: String, 
    },
    message:{
        type: String, 
    },
   // image:{
     //   type: image 
    //}
});

module.exports = mongoose.model('message', postSchema);