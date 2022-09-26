const express = require('express');
const router = express.Router();
const multer = require("../middlewares/multer-config")

const messageControll = require('../controllers/message.controller');
const auth = require('../middlewares/authJwt')


router.post('/create',auth,multer, messageControll.createMessage);
router.get('/messagePosted',auth, messageControll.getAllMessages);
router.get('/uniqueMessage/:id',auth, messageControll.findOneMessage);
router.delete('/deleteMessage/:id',auth, messageControll.deleteMessage)
router.put('/modif/:id', auth, messageControll.modifMessage)

module.exports = router; 