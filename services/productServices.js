const DAO = require("../DAOs/DAOsFactory.js");
const logger = require('../utils/winston.js')

exports.getProductService = async () => {
    try {
        return await DAO.getProductData()
    } catch (e) {
        logger.log('error', `❌ Error cant get product service: ${e}`);
    }
};

exports.postProductService = async (data) => {
    try {
        return await DAO.postProductData(data)
    } catch (e) {
        logger.log('error', `❌ Error cant post product: ${e}`);
    }
};

exports.putProductService = async (data) => {
    try {
        return await DAO.putProductData(data)
    } catch (e) {
        logger.log('error', `❌ Error cant put product: ${e}`);
    }
}

exports.deleteProductService = async (id) => {
    try {
        return await DAO.deleteProductData(id)
    } catch (e) {
        logger.log('error', `❌ Error cant delete product whit id: _${id}: ${e}`);
    }
}