const Message = require('../models/post.model');


// le create
exports.createMessage = (req, res, next) => {
    const message = new Message({
        userId: req.body.userId,
        message: req.body.message
       // image
    })
    console.log(message)
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }))
}

// le read

