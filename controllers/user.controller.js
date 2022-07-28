const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name
      });
      user.save().then(
        () => {
          res.status(201).json({
            message: 'Utilisateur ajouté avec succès'
          });
        }
      ).catch(
        (error) => {
          console.log(error)
          res.status(500).json({
            error: error
          });
        }
      );
    }
  );
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('Utilsateur non trouvé')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('mot de passe incorect')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_NEW_TOKEN_ASSIGNED',
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};

exports.findUser = (req, res, next) => {

  User.findOne({ _id: req.params.id }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('Utilsateur non trouvé')
        });
      }
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        IsAdmin: false,
      })
    })

}


exports.deleteUser = (req, res, next) => {

  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('Utilsateur non trouvé')
        });
      }
      User.deleteOne({ _id: req.params.id })
        .then(res.status(200).json({ message: "utilisateur supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.UpdateName = (req, res, next) => {

const UserObj = req.params.id

  User.updateOne({ _id: req.params.id }, { ...UserObj, name: req.body.name, email: req.body.email })
    .then(res.status(200).json({ message: "nom modifiée" }))
    .catch((error) => res.status(400).json({ error }));
    console.log(UserObj)
}

exports.UpdateEmail = (req, res, next) => {

  const UserObj = req.params.email
  
    User.updateOne({ _id: req.params.id }, { ...UserObj, email: req.body.email })
      .then(res.status(200).json({ message: "email modifiée" }))
      .catch((error) => res.status(400).json({ error }));
      console.log(UserObj)
  }

  exports.UpdatePicture = (req, res, next) => {

      const UserObj= req.file
      ?{

    UserimageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,

  }: {...req.body}
      User.updateOne({ _id: req.params.id }, { ...UserObj, userImageUrl: req.body.userImageUrl })
        .then(res.status(200).json({ message: "photo modifiée" }))
        .catch((error) => res.status(400).json({ error }));
        console.log(userImageUrl)
    }