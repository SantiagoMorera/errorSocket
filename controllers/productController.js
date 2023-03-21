const {
    getProductService,
    postProductService,
    putProductService,
    deleteProductService
} = require('../services/productServices.js');

const logger = require('../utils/winston.js');

const getProductController = async (req, res) => {
    try {
        const data = await getProductService();
        res.json(data);
    } catch (e) {
        logger.log('error', `❌ Error cant get product controller ${e}`);
    }
};

const getProductsListController = async (req, res) => {
    res.render('productList', { layout: 'logged' });
};

const getPostProductViewController = async (req, res) => {
    res.render('postProduct', { layout: 'logged' });
};

const postProductController = async (req, res) => {
    try {
        const data = req.body;
        await postProductService(data);
        res.status(201);
        res.render('postProduct', { layout: 'logged' });
    } catch (e) {
        logger.log('error', `❌ Error adding product Controller: ${e}`);
    }
};

const putProductController = async (req, res) => {
    try {
        const data = req.body;
        await putProductService(data);
        res.json("Put Success, product:", { data });
    } catch (error) { }
};

const deleteProductController = async (req, res) => {
    try {
        const id = req.id;
        // const data = req.body
        await deleteProductService(id);
        res.status(200);/* .json( "delete Success, product:",{id}) */
        /* res.json() */
    } catch (error) { }
};

module.exports = {
    getProductController,
    getProductsListController,
    getPostProductViewController,
    postProductController,
    putProductController,
    deleteProductController
};
