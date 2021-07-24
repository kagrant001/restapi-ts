"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//gives us the current date in a 'nice human readable format'
var getTimeStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, info metric (to identify that this is a log), where its being called from, the message attached,
        //and the object
        console.log("[" + getTimeStamp() + "] [INFO] [" + namespace + "] " + message, object);
    }
    else {
        console.log("[" + getTimeStamp() + "] [INFO] [" + namespace + "] " + message);
    }
};
var warn = function (namespace, message, object) {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, warn metric (to identify that this is a log), where its being called from, the message attached,
        //and the object
        console.warn("[" + getTimeStamp() + "] [WARN] [" + namespace + "] " + message, object);
    }
    else {
        console.warn("[" + getTimeStamp() + "] [WARN] [" + namespace + "] " + message);
    }
};
var error = function (namespace, message, object) {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, error metric (to identify that this is a log), where its being called from, the message attached,
        //and the object
        console.error("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] " + message, object);
    }
    else {
        console.error("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] " + message);
    }
};
var debug = function (namespace, message, object) {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, debug metric (to identify that this is a log), where its being called from, the message attached,
        //and the object
        console.debug("[" + getTimeStamp() + "] [DEBUG] [" + namespace + "] " + message, object);
    }
    else {
        console.debug("[" + getTimeStamp() + "] [DEBUG] [" + namespace + "] " + message);
    }
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
