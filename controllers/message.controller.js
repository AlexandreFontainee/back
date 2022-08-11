const Message = require('../models/message.model');
const User = require('../models/user.model')


// le create
exports.createMessage = (req, res, next) => {
  const message = new Message({

    message_content: req.body.message_content,
    title: req.body.title,
    name: req.body.name,
    imageUrl: req.body.imageUrl,

  })
  console.log(message)
  message.save()
  .then(()=> {
    User.findOne({name: req.body.name}, (user)=>{
      if(user){
        user.messages.push(message);
        user.save()
      }
    })
  }).then(() => res.status(201).json({ message: "Publication réussie" }))
   .catch(error => res.status(400).json({ error }))
}


exports.getAllMessages = (req, res) => {
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
        title: message.title,
        message: message.message_content,
        UserId: req.body.UserId
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