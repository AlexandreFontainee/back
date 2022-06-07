const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
app.use(cors({origin: "http://192.168.1.20:8080"}));
app.use(express.json());



//pour parser les url
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const logMongoDb = process.env.logMongoDb;

mongoose.connect(logMongoDb,
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));



// routes
const userRoute = require('./routes/user.routes');

app.use('api/authJwt', userRoute);

// port du back qui tourne sur le port 8080
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});