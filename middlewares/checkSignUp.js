const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
CheckNewAcc = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (user) {
      return res.status(400).send({
        message: "Ce nom d'utilisateur est déjà utilisé !"
      });
    }
    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      return res.status(400).send({
        message: "Cet email est déjà pris !"
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Impossible de valider ce nom d'utilisateur !"
    });
  }


};

// boucle for pour vérifier que le rôle soit existant 
CheckRole = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Ce rôle n'existe pas ! = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

// constante qui contient nos deux fonctions pour éviter les doublons/ pb d'utilisateurs ..
const checkSignUp = {
    CheckNewAcc,
    CheckRole
};
module.exports = checkSignUp;