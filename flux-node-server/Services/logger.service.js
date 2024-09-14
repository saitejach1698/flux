const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Custom log format
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
                                level: 'info',
                                format: combine(
                                    label({ label: 'auth-service' }),
                                    timestamp(),
                                    logFormat
                                ),
                                transports: [
                                    new transports.Console(),
                                    new transports.File({ filename: 'logs/error.log', level: 'error' }),
                                    new transports.File({ filename: 'logs/combined.log' })
                                ]
                            });

module.exports = logger;
