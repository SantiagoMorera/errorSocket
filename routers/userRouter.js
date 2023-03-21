const { Router } = require('express');
const { getUserProfile } = require('../controllers/userController.js');
const { checkAuthentication } = require('../middleware/passportAuth.js');

const router = Router();

router.get('/profile', checkAuthentication, getUserProfile);

module.exports = router;
