const { DAO } = require("../DAOs/DAOsFactory.js");
const logger = require('../utils/winston.js')

exports.getMessagesService = async () => {
    try {
        return await DAO.getMessagesData()
    } catch (e) {
        logger.log('error', `❌ Error cant get stock service : ${e}`);
    }
};

exports.postMessageService = async (data) => {
    try {
        return await DAO.postMessageData(data)
    } catch (e) {
        logger.log('error', `❌ Error cant post message data : ${e}`);
    }
};