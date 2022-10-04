const Message = require('../models/message.model');

// POST
exports.createMessage = (req, res, next) => {
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
    message_content: req.body.message_content
  }

  Message.updateOne({ _id: req.params.id }, { ...newMsg })
    .then(() => {
      console.log('message ok!')
      return res.status(200).json({ message: "message modifiée" })
    })
    .catch((error) => { console.log(error); return res.status(400).json({ error }) })


}
