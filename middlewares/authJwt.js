const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

// vérification du token de la cession 
verifyToken = (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({
      message: "Aucun jeton d'identification !",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Non autorisé !",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// contrôle du rôle de l'utilisateur (Admin)
isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(403).send({
      message: "requière le statut d'admin!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Impossible de valider votre rôle d'utilisateur!",
    });
  }
};

// contrôle du rôle de l'utilisateur (modérateur)
isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }
    return res.status(403).send({
      message: "requière le statut de modérateur!!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Impossible de valider votre rôle d'utilisateur!",
    });
  }
};

// si modérateur ou admin
isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(403).send({
      message: "Requière un rôle d'admin ou de modérateur !",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Impossible de valider votre rôle d'utilisateur!",
    });
  }
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt;