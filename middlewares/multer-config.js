// MIDDLEWARE POUR LA GESTION DE MES IMAGES
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, "images");
  },
 
  filename: (req, file, callback) => {
    console.log(file)
    const name = file.originalname.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("images");