//this file is meat of api (links everything together)

import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';

import sampleRoutes from './routes/sample';

//NAMESPACE is going to be how we determine where our logs are comming from
const NAMESPACE = 'Server';
//router is going to be what defines our api behavior
const router = express();

/** Logging the request */
//injecting middleware into our software (modify, read, or just do something with the data thats being passed)
//it can end right there and return to the user or pass on to another middleware and then that does something
router.use((req, res, next) => {
    //logging info of whats being requested
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    //access response through middleware, listener for when response is finished
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the request */
//after logging, we need to parse the body of the request using bodyParser

//because express now has a bodyParser, we actually dont need to import bodyParser anymore
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Rules of API */
router.use((req, res, next) => {
    //means that our response can come from anyware
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/sample', sampleRoutes);

/** Error Handling */
//if the api gets through all of our defined routes then it means that the user has entered an route that doesnt
// exist, so error
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
