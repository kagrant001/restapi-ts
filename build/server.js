"use strict";
//this file is meat of api (links everything together)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var sample_1 = __importDefault(require("./routes/sample"));
//NAMESPACE is going to be how we determine where our logs are comming from
var NAMESPACE = 'Server';
//router is going to be what defines our api behavior
var router = express_1.default();
/** Logging the request */
//injecting middleware into our software (modify, read, or just do something with the data thats being passed)
//it can end right there and return to the user or pass on to another middleware and then that does something
router.use(function (req, res, next) {
    //logging info of whats being requested
    logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    //access response through middleware
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    });
    next();
});
/** Parse the request */
//after logging, we need to parse the body of the request using bodyParser
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
/** Rules of API */
router.use(function (req, res, next) {
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
router.use('/sample', sample_1.default);
/** Error Handling */
//if the api gets through all of our defined routes then it means that the user has entered an route that doesnt
// exist, so error
router.use(function (req, res, next) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
/** Create the server */
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
