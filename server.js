const http = require('http');
const app = require('./lib/express');
const logger = require('./lib/logs');
const config = require('./config/config-default');
const { initConnection } = require('./lib/mongoose');

try{
    initConnection();
    const server = http.createServer(app);
    server.listen(config.PORT, () => logger.info(`Lisining to Server : ${config.PORT}`));
}
catch(error){
    logger.error(`Server Problem - Server will not up : ${error}`);
    res.status(500).json({message:`Server Problem - Server will not up` });
}

