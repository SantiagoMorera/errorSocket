const Product = require('../../schemas/product');
const logger = require('../../utils/winston');

class DAOproductsMongo {
    async getProductData() {
        try {
            return await Product.find({});
        } catch (e) {
            logger.log('error', `❌ Error cant get product data: ${e}`);
        }
    }

    async postProductData(data) {
        try {
            await Product.create(data);
        } catch (e) {
            logger.log('error', `❌ Error cant post product data: ${e}`);
        }
    }

    async putProductData(data) {
        try {
            await Product.replaceOne(data);
        } catch (e) {
            logger.log('error', `❌ Error cant put product data: ${e}`);
        }
    }

    async deleteProductData(id) {
        try {
            await Product.deleteOne(id);
        } catch (e) {
            logger.log('error', `❌ Error cant delete product data: ${e}`);
        }
    }
}

module.exports = DAOproductsMongo;













