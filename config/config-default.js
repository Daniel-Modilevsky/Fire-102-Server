const dotenv =  require('dotenv');
dotenv.config();

// enviroment variable
const config = {
    PORT: process.env.port,
    LOGFILE: process.env.logFile,
    CS: process.env.CS,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    OPTIONS: process.env.options
}


module.exports = config;