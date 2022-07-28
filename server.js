const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
app.use(cors({origin: "http://localhost:8080"}));
app.use(express.json());

// gestion d'image avec multer
app.use("/images", express.static(path.join(__dirname, "images")));

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
const messageRoute = require('./routes/message.routes')

app.use('/api/authJwt', userRoute);
app.use('/api/message', messageRoute);

// port du back qui tourne sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});