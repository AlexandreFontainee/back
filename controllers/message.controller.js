const Message = require('../models/message.model');


// le create
exports.createMessage = (req, res, next) => {
  console.log('createMessage.name');
  const message = new Message({

    message_content: req.body.message_content,
    title: req.body.title,
    userId: req.body.userId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    
  })
  console.log(message)
  message.save()
    .then(() => {
      return res.status(201).json({ message: "Publication réussie" })
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json({ error })
    })
}


exports.getAllMessages = (req, res) => {
  Message.find()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));

}


// trouver un message
exports.findOneMessage = (req, res,) => {

  Message.findOne({ _id: req.params.id }).then(

    (message) => {
      if (!message) {
        return res.status(401).json({
          error: new Error('aucun message trouvé')
        });
      }
      console.log({ _id: req.params.id });
      res.status(200).json({
        title: message.title,
        message_content: message.message_content,
        userId: message.userId
      })
    })

}

exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id }).then(
    (message) => {
      if (!message) {
        return res.status(40).json({
          error: new Error('aucun message trouvé')
        });
      }
      Message.deleteOne({ _id: req.params.id })
        .then(res.status(200).json({ message: "message supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
}