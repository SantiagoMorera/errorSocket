const fs = require('fs');
const logger = require('../../utils/winston');
const path = require('path');

class DAOproductsFile {
    async getProductData() {
        try {
            const data = await fs.promises.readFile(path.join(__dirname, 'productStock.json'));
            const dataParse = JSON.parse(data);
            return dataParse;
        } catch (e) {
            logger.log('error', `❌ Error cant get product data: ${e}`);
        }
    }

    async postProductData(data) {
        try {
            return await fs.promises.writeFile(path.join(__dirname, 'productStock.json'), JSON.stringify(data, null, 3));
        } catch (e) {
            logger.log('error', `❌ Error adding product data: ${e}`);
        }
    }
}

module.exports = DAOproductsFile;








