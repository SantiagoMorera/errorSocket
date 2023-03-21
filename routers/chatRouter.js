const { Router } = require('express');
const { getChat, postMessageController } = require('../controllers/chatController.js');
const { checkAuthentication } = require('../middleware/passportAuth.js');

const router = Router();

router.get('/chat', checkAuthentication, getChat);
router.post('/mensaje', postMessageController);

module.exports = router;