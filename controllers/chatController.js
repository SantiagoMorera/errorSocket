const { postMessageService } = require("../services/messageServices.js");
const logger = require('../utils/winston.js');

const getChat = async (req, res) => {
    try {
        res.render('chat', { layout: 'logged' })
    } catch (e) {
        logger.log('error', `❌ Error cant render chat ${e}`);
    }
};

const postMessageController = async (req, res) => {
    try {
        const data = req.body
        await postMessageService(data)
    } catch (e) {
        logger.log('error', `❌ Error cant post message controller: ${e}`);
    }
}


module.exports = {
    getChat,
    postMessageController
};