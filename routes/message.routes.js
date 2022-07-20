const express = require('express');
const router = express.Router();

const messageControll = require('../controllers/message.controller');


router.post('/create', messageControll.createMessage);
router.get('/messagePosted', messageControll.getAllMessages)
router.get('/uniqueMessage', messageControll.findOneMessage)

module.exports = router; 