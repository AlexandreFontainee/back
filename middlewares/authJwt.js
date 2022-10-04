// MIDDLEWARE D AUTHENTIFICATION 
const jwt = require("jsonwebtoken");
const message = require("../models/message.model");
require("dotenv").config();
const tokenLog = process.env.secretToken;

module.exports = (req, res, next) => {
  try {
    console.log(JSON.stringify(req.headers))
    console.log(JSON.stringify(req.body))

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, tokenLog);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId ) {
      throw "Invalid user ID";
    } else if ( req.method === "PUT") {  
      message.findOne({ _id: req.params.id })
      
        .then((message) => {
          if (message.userId !== userId ) {
            res.status(401).json({
              error: "requête non autorisé",
            });
          } else {
            next();
          }
        })
        .catch((error) => res.status(404).json({ error: error.message }));
    } else {
      next();
    }
  } catch(error){
    console.log(error);
    res.status(401).json({
      error: "requête non autorisé",
    });
  }
};