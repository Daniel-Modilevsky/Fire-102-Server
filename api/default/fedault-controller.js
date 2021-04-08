const logger = require('../../lib/logs');


const method = (req, res, next) => {
    logger.http(`${req.method}`);
    next();
};
const errorHandler = (error, req, res, next) => {
    logger.error(`Error - You went into a ${error.status} problem - Please try a diffrent senario , ${error.stack}`);
    res.status(error.status || 500).json({ message: "Error - You went into a 500 problem - Please try a diffrent senerio" });
};
const index = (req, res) => {
    logger.info('Hey and welcome to first Ex!');
    res.status(200).json({ message: 'Hey and welcome to first Ex!' });
};
const routeInvalid = (req, res) => {
    logger.error('You went into a 404 problem - Please try a valid route');
    res.status(404).json({ message: 'You went into a 404 problem - Please try a valid route' })
};

module.exports = { method ,errorHandler, index, routeInvalid };
  