const express = require('express');
const router = express.Router();

const userControll = require('../controllers/user.controller');


router.post('/signup', userControll.signup);
router.post('/login', userControll.login);
router.get("/user/:id", userControll.findUser);
router.delete("/delete", userControll.deleteUser)

module.exports = router; 