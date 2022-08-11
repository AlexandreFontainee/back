const express = require("express");
const multer = require('multer')
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
app.use(cors({origin: "http://localhost:8080"}));
app.use(express.json());

// gestion d'image avec multer
app.use("/images", express.static(path.join(__dirname, "images")));

// grand test 

var storage = multer.diskStorage({
	// La limite en taille du fichier
	limits: {
	  fileSize: 1000000, //1Mo
	},
	// La destination, ici ce sera à la racine dans le dossier img
	destination: function (req, file, cb) {
	  cb(null, './img')
	},
	// Gestion des erreurs
	fileFilter(req, file, cb) {
	  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		return cb(new Error('Le fichier doit etre un JPG'))
	  }
	  cb(undefined, true)
	},
	// Fonction qui renomme l'image
	filename: function (req, file, cb) {
	  // Genère un nom aléatoire et récupère l'ancienne extension
	  cb(
		null,
		Math.random().toString(36).substring(7) +
		  '.' +
		  file.originalname.split('.')[1],
	  )
	},
  })
  // Création de l'objet multer
  const upload = multer({
	storage: storage,
  })


  app.post('/upload_image', upload.single('img'), async (req, res) => {
	try {
	  if (req.file) {
		// Utilise la librairie sharp pour redimensionner en 200x100, et renvoi la miniature dans un autre fichier dans le dossier de destination choisi dans le diskStorage
		await sharp(req.file.path, { failOnError: false })
		  .resize({ width: 200, height: 100 })
		  .toFile(
			path.resolve(req.file.destination + '/thumbnail', req.file.filename),
		  )
		// Vous pouvez utiliser ces variables pour faire des insertions en base de données ou autre
		let filename = req.file.filename
		let alt_text = req.body.alt_text
	  }
	  res.send('Upload fini')
	} catch (e) {
	  res.status(400).send(e)
	}
  })







// fin de test
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