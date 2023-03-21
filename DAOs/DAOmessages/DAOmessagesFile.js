const fs = require('fs');
const logger = require('../../utils/winston');

class DAOmessagesFile {
    constructor() {
        this.filePath = '../../data/messagesHistory.json';
    }

    async getMessageData() {
        try {
            return await fs.promises.readFile(this.filePath);
        } catch (e) {
            logger.log('error', `❌ Error cant get message data: ${e}`);
        }
    }

    async postMessageData(data) {
        try {
            return await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 3));
        } catch (e) {
            logger.log('error', `❌ Error adding message data: ${e}`);
        }
    }
}

module.exports = DAOmessagesFile;


