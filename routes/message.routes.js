const express = require('express');
const router = express.Router();
const multer = require("../middlewares/multer-config")

const messageControll = require('../controllers/message.controller');


router.post('/create',multer, messageControll.createMessage);
router.get('/messagePosted', messageControll.getAllMessages);
router.get('/uniqueMessage', messageControll.findOneMessage);
router.delete('/deleteMessage', messageControll.deleteMessage)

module.exports = router; 