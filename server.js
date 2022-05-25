const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
app.use(cors());
app.use(express.json());

const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// fonction pour intialiser les tables de roles dans la bdd
function initial() {
	Role.create({
	  id: 1,
	  name: "user"
	});
   
	Role.create({
	  id: 2,
	  name: "moderator"
	});
   
	Role.create({
	  id: 3,
	  name: "admin"
	});
  }

//pour parser les url
app.use(express.urlencoded({ extended: true }));

// à remplacer avec jwt
app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// route test
app.get("/", (req, res) => {
  res.json({ message: "coucou." });
});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// port du back qui tourne sur le port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});