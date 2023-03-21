const DAOmessagesFile = require("./DAOmessages/DAOmessagesFile.js");
const DAOmessagesMemory = require("./DAOmessages/DAOmessagesMemory.js");
const DAOmessagesMongo = require("./DAOmessages/DAOmessagesMongo.js");

const DAOproductsFile = require("./DAOproducts/DAOproductsFile.js");
const DAOproductsMemory = require("./DAOproducts/DAOproductsMemory.js");
const DAOproductsMongo = require("./DAOproducts/DAOproductsMongo.js");

const MongoConnectSingleton = require("../utils/MongoConnectSingleton.js");

const logger = require('../utils/winston.js');

let mode = process.argv[ 2 ];


MongoConnectSingleton.getInstance();

if (mode == 'dev') {
    logger.log('info', `✅ DAOfactory Memory ON`);
    DAO = new DAOmessagesMemory() && new DAOproductsMemory();
} else if (mode == 'file') {
    logger.log('info', `✅ DAOfactory File ON`);
    DAO = new DAOmessagesFile() && new DAOproductsFile();
} else if (mode == 'prod') {
    logger.log('info', `✅ DAOfactory Mongo ON`);
    DAO = new DAOmessagesMongo() && new DAOproductsMongo();
} else {
    throw logger.log('warn', `⚠️ DAOfactory unsetted`);
}

module.exports = DAO;
