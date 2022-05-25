const config = require("../config/database.config");
const Sequelize = require("sequelize");

// On initialise sequelize avec les infos de notre bdd
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Ici on fait appel à nos models 
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

// Un rôle peut être utilisé par différent utilisateurs 
db.role.belongsToMany(db.user, {
  through: "user_roles", // création d'une table user_roles qui met en liens les deux  
  foreignKey: "roleId",
  otherKey: "userId"
});

// un utilisateur peut obtenir tout les rôles
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;