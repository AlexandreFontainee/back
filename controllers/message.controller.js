const Message = require('../models/post.model');


// le create
exports.createMessage = (req, res, next) => {
    const message = new Message({

        message_content: req.body.message_content,
        title: req.body.title
       // image
    })
    console.log(message)
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }))
}


exports.getAllMessages =(req,res) => {
    Message.find()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));
}


// trouver un message
exports.findOneMessage = (req, res, next) => {

    Message.findOne({ _id: req.params.id }).then(
      (message) => {
        if (!message) {
          return res.status(401).json({
            error: new Error('aucun message trouvé')
          });
        }
        res.status(200).json({
          id: message.id,
          message: message.message_content,
        })
      })
  
  }