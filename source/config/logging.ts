//gives us the current date in a 'nice human readable format'
const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, info metric (to identify that this is an info log), where its being called from, the message attached,
        //and the object
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, warn metric (to identify that this is a warn log), where its being called from, the message attached,
        //and the object
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, error metric (to identify that this is an error log), where its being called from, the message attached,
        //and the object
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    //checking to see if we have an object passed or not
    if (object) {
        //log time stamp, debug metric (to identify that this is a debug log), where its being called from, the message attached,
        //and the object
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
