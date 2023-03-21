const redis = require("redis");
const session = require("express-session");
const RedisStore = require('connect-redis')(session);
const logger = require("../utils/winston.js");

const client = redis.createClient({ legacyMode: true, });

/* const client = redis.createClient({
    socket: {
        host: 'containers-us-west-187.railway.app',
        port: '6626'
    },
    legacyMode: true,
    password: 'bejSQHLCZK3T031qlStf'
}); */

const RedisStoreSession = new RedisStore(session);

const redisConnect = () => {
    try {
        client.connect();
        logger.log('info', "✅ Redis ON");
    } catch (error) {
        throw logger.log('error', `❌ Can not connect to Redis! ${error}`);
    }
};

module.exports = { client, RedisStoreSession, redisConnect };