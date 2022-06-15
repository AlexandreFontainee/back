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
          (error) => {  console.log(error)
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
}