const express = require('express');
const router = express.Router();

const messageControll = require('../controllers/message.controller');


router.post('/create', messageControll.createMessage);

module.exports = router; 