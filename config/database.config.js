// dotenv pour le criptage 
require('dotenv').config();
const hostCripted = process.env.HostDb;
const userCripted = process.env.User_db;
const PwCripted = process.env.Password_db;
const DbCripted = process.env.DataBaseName;

// la config de ma base de donnée que je vais pouvoir exporter
module.exports = {
    HOST: hostCripted,
    USER: userCripted,
    PASSWORD: PwCripted,
    DB: DbCripted,
    dialect: "mysql",
    pool: {
        max: 5, // max de connection
        min: 0, // min de connection
        acquire: 30000, // temps de connection max d'innactivité
        idle: 10000 // temps de connection avant erreur 
    }
};

