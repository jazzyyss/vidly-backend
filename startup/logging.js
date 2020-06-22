require('express-async-errors');
const winston = require('winston');

module.exports = function () {
  winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: 'rejections.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' })
    ]
  });
};

/* const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));



  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost:27017/vidly',
    level: 'info'
  });
} */