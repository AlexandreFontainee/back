const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  // Créée un utilisateur dans la bdd 
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      const result = user.setRoles(roles);
      if (result) res.send({ message: "L'utilisateur a été ajoué avec succès !" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message:  "L'utilisateur a été ajoué avec succès !"  });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// connection d'un utlisateur 
exports.signin = async (req, res) => {
  try {
    // on cherche le username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // si pas trouvé
    if (!user) {
      return res.status(404).send({ message: "Utilisateur introuvable !" });
    }
    // utilisateur trouvé -> on compare le mdp en utilisant bcrypt
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    // si mdp pas valide -> message d'erreur
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Mot de passe invalide !",
      });
    }
    // Si l'utilisateur est valide -> on lui attribue son token 
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // durée de vie de 24 heures pour le token 
    });
    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    req.session.token = token;
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Si l'utilisateur veut mettre fin à sa session 
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Vous avez été bien déconnecté !"
    });
  } catch (err) {
    this.next(err);
  }
};