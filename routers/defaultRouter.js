const { Router } = require('express');
const { getHomeController } = require('../controllers/homeController.js');

const router = Router();

router.get('/', getHomeController);

module.exports = router;