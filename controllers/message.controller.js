const Message = require('../models/message.model');

// le create
exports.createMessage = (req, res, next) => {
  console.log('createMessage.name');
  const message = new Message({
    message_content: req.body.message_content,
    title: req.body.title,
    userId: req.body.userId,
    name: req.body.name,
    userImageUrl: req.body.userImageUrl
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


exports.getAllMessages = (req, res) => {
  Message.find()
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(400).json({ error }));

}


// trouver un message
exports.findOneMessage = (req, res,) => {
  console.log(req.params.id)
  Message.findOne({ _id: req.params.id }).then(

    (message) => {
      if (!message) {
        return res.status(401).json({
          error: new Error('aucun message trouvé')
        });
      }
      console.log({ message });
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
        return res.status(400).json({
          error: new Error('aucun message trouvé')
        });
      }

      Message.deleteOne({ _id: req.params.id })
        .then(res.status(200).json({ message: "message supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
}

exports.modifMessage = (req, res, next) => {

  const MessageObj = req.file
    ? {

      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,

    } : { ...req.body }

  console.log(JSON.stringify(MessageObj));
  Message.updateOne({ _id: req.params.id }, { ...MessageObj,imageUrl:"http://localhost:5000/images/" + req.file.filename }),
  {title: req.body.title}, {message_content: req.body.message_content}
    .then(() => {
      console.log('message ok!')
      return res.status(200).json({ message: "message modifiée" })
    })
    .catch((error) => {console.log(error); return res.status(400).json({ error })})
}
    


exports.likeDislike = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const messageId = req.params.id;
  if (!userId) {
    res.status(401).json({ error: "Utilisateur requis !" });
    return;
  }

  Message.findOne({ _id: messageId })
    .then((message) => {

      if (like === 1) {
        if (message.usersLiked.includes(userId) || message.usersDisliked.includes(userId)) {

          res.status(401).json({ error: "L'utilisateur a déjà liké ou disliké" });
        } else {

          Message.updateOne({ _id: req.params._id }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
            .then(() => res.status(200).json({ message: "J'aime" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        }
      } else if (like === 0) {
        if (sauce.usersLiked.includes(userId)) {

          Message.updateOne({ _id: req.params._id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
            .then(() => res.status(200).json({ message: "Neutre" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        } else if (sauce.usersDisliked.includes(userId)) {

          Message.updateOne({ _id: req.params._id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
            .then(() => res.status(200).json({ message: "Neutre" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        } else {

          res.status(401).json({ error: "Utilisateur n'a pas liké ou disliké" });
        }
      } else if (like === -1) {

        if (message.usersLiked.includes(userId) || message.usersDisliked.includes(userId)) {

          res.status(401).json({ error: "L'utilisateur a déjà liké ou disliké" });
        } else {

          Message.updateOne({ _id: req.params._id }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
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