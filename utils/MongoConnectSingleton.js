const dotenv = require('dotenv');
const mongoose = require("mongoose");
const logger = require('../utils/winston.js');
dotenv.config();

const mongoURL = process.env.MONGODB_URL;

class MongoConnectSingleton {
    static instance = null;

    constructor() {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoURL)
            .then(() => logger.log('info', "✅ Singleton Runned Session Mongo"))
            .catch(e => logger.log('error', ` ❌ DB OFF ${e}`));
    }
    static getInstance() {
        if (!MongoConnectSingleton.instance) {
            MongoConnectSingleton.instance = new MongoConnectSingleton();
        }
        return MongoConnectSingleton.instance;
    }
}

module.exports = MongoConnectSingleton;
