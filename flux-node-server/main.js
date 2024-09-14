const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cluster = require('cluster');
const os = require('os');
const config = require('./config.json');
const dbInit = require('./database/dbInit');
const logger = require('./Services/logger.service'); // Import the logger
const authMiddleware = require('./Middleware/auth'); // Import the auth middleware
const path = require("path");

// Ensure db.js initializes the connections
require('./database/db');

if (cluster.isMaster) {
    const numCPUs = config.workers || os.cpus().length;
    logger.info(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.warn(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart the worker
    });

} else {
    const app = express();

    app.use(cors(config.corsOptions));
    app.use(bodyParser.json());

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 30 } // 30 minutes
    }));

    // Serve only the static files form the dist directory
    app.use(express.static(path.join(__dirname, '../ui/dist')));

    // For all GET requests, send back index.html so that PathLocationStrategy can be used
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../ui/dist/index.html'));
    });


    // Middleware to log request details
    app.use((req, res, next) => {
        logger.info(`Request: ${req.method} ${req.url} - Params: ${JSON.stringify(req.params)} - Body: ${JSON.stringify(req.body)}`);
        const oldSend = res.send;

        res.send = function (data) {
            logger.info(`Response: ${res.statusCode} - Body: ${data}`);
            oldSend.apply(res, arguments);
        };

        next();
    });

    // Initialize routes
    const loginRoutes = require('./routes/auth');
    const employeeRoutes = require('./routes/employees');

    app.use('/auth', loginRoutes);
    app.use('/employees', authMiddleware, employeeRoutes);
    app.use('/check', (req, res) => {
        res.send('hai');
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        logger.error(err.stack);
        res.status(err.status || 500).send('Something Went Wrong!');
    });

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Custom-Header, Authorization');
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
        next();
    });

    
    app.listen(config.port, () => {
        logger.info("codecommit check");
        logger.info(`Worker ${process.pid} started on port ${config.port}`);
    });
}
