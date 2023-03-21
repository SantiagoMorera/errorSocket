const Message = require("../../schemas/message.js");
const logger = require('../../utils/winston.js');

class DAOmessagesMongo {

    getMessageData = async () => {
        try {
            return await Message.find({})
        } catch (e) {
            logger.log('error', `❌ Error cant get Message data: ${e}`);
        }
    };

    postMessageData = async (data) => {
        try {
            await Message.create(data)
        } catch (e) {
            logger.log('error', `❌ Error cant post Message data: ${e}`);
        }
    };
}

module.exports = DAOmessagesMongo;












