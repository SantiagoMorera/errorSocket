const { Router } = require('express');
const {
    getPostProductViewController, getProductController, getProductsListController, postProductController, putProductController, deleteProductController
} = require('../controllers/productController.js');

const router = Router();

router.get('/post', getPostProductViewController)
router.post('/post', postProductController)
router.get('/stock', getProductController)
router.get('/list', getProductsListController)
router.put('/put', putProductController)
router.delete('/delete/:id', deleteProductController)

module.exports = router;