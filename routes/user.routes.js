const express = require('express');
const router = express.Router();

const userControll = require('../controllers/user.controller');


router.post('/signup', userControll.signup);
router.post('/login', userControll.login);
router.get("/user/:id", userControll.findUser);
router.delete("/delete/:id", userControll.deleteUser);
router.put("/update/:id", userControll.UpdateName);
router.put("/update/:id", userControll.UpdateEmail);


module.exports = router; 