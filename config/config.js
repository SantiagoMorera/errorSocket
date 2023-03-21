const dotenv = require('dotenv');
dotenv.config();

const config = {
    env: {
        port: process.env.PORT
    }
}

module.exports = config;
