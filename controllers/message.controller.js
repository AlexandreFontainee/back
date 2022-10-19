const Message = require('../models/message.model');

// POST
exports.createMessage = (req, res, next) => {
  const message = new Message({
    message_content: req.body.message_content,
    title: req.body.title,
    userId: req.body.userId,
    name: req.body.name,
    userImageUrl: req.body.userImageUrl,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  })
  if (req.file) {

    message.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  }
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

// GET
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
      res.status(200).json({
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        message_content: message.message_content,
        userId: message.userId
      })
    })

}

// DELETE
exports.deleteMessage = (req, res, next) => {

  Message.findOne({ _id: req.params.id }).then(
    (message) => {
      if (!message) {
        return res.status(400).json({
          error: new Error('aucun message trouvé')
        });
      }

      Message.deleteOne({ _id: req.params.id })
        .then(res.status(200).json({ message: "message supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
}

// PUT
exports.modifMessage = (req, res, next) => {

  const { id: _id } = req.params

  const newMsg = {
    _id,
    title: req.body.title,
    message_content: req.body.message_content,
  }
  Message.updateOne({ _id: req.params.id }, { ...newMsg})
    .then(() => {
      console.log('message ok!')
      return res.status(200).json({ message: "message modifiée" })
    })
    .catch((error) => { console.log(error); return res.status(400).json({ error }) })


}

exports.MessagePicture = (req, res, next) => {

  const { id: _id } = req.params

  const newMsg = {
    _id,
    imageUrl: req.file.filename
  }
  console.log(newMsg)
  Message.updateOne({ _id: req.params.id }, { ...newMsg, imageUrl:"http://localhost:5000/images/" + req.file.filename})
    .then(() => {
      console.log('message ok!')
      return res.status(200).json({ message: "message modifiée" })
    })
    .catch((error) => { console.log(error); return res.status(400).json({ error }) })

}

// like dislike 

exports.likeDislikeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const MessageId = req.params.id;
  if (!userId) {
    res.status(401).json({ error: "Utilisateur requis !" });
    return;
  }
  
  Message.findOne({ _id: MessageId })
    .then((message) => {

      if (like === 1) {
        if (message.usersLiked.includes(userId) || message.usersDisliked.includes(userId)) {
         
          res.status(401).json({ error: "L'utilisateur a déjà liké ou disliké" });
        } else {
        
          Message.updateOne({ _id: MessageId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
            .then(() => res.status(200).json({ message: "J'aime" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        }
      } else if (like === 0) {
        if (message.usersLiked.includes(userId)) {

          Message.updateOne({ _id: MessageId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
            .then(() => res.status(200).json({ message: "Neutre" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        } else if (message.usersDisliked.includes(userId)) {

          Message.updateOne({ _id: MessageId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
            .then(() => res.status(200).json({ message: "Neutre" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        } else {
 
          res.status(401).json({ error: "Utilisateur n'a pas liké ou disliké" });
        }
      } else if (like === -1) {

        if (message.usersLiked.includes(userId) || message.usersDisliked.includes(userId)) {

          res.status(401).json({ error: "L'utilisateur a déjà liké ou disliké" });
        } else {
      
          Message.updateOne({ _id: MessageId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
            .then(() => {
              res.status(200).json({ message: "Je n'aime pas" });
            })
            .catch((error) => res.status(400).json({ error: error.message }));
        }
      } else {
        res.status(400).json({ error: "Like ne peut que être égale à -1, 0 ou 1" });
      }
    })
    //
    .catch((error) => res.status(404).json({ error: error.message }));
};