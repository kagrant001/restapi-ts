# Project Configuration (mostly terminal commands)

we start with some basic terminal commands just to import all of the packages and get the project backbone.

```
//this will create the backbone of the project, mainly make sure that the entry point is set to source/server.ts

npm init
```

next:

```
//globally installing 4 packages that will help create the backbone of the api

npm install -g typescript nodemon ts-node prettier
```

next:

```
//in package.json, change "test" in "scripts" to

//when running npm run build in the terminal at the end, it will automatically get rid of the old
//build folder, cleans up the code with prettier, then compiles it into typescript

"build": "rm -rf build/ && prettier --write source/ && tsc"
```

next:

```
//installing 3 more packages that will actually help with the api

//express is the framework to the api, dotenv allows us to access enviornment variables

npm install express dotenv
```

next:

```
//install our type definitions for the packages we just installed

npm install --save-dev @types/express @types/dotenv
```

# Code Configuration

-   ## logging
    this is simply to track where data is being called from, every request will be tracked from the server.ts file

make:  
source \ config \ logging.ts

```ts
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
```

also make more functions that work the same way as info, but are for the purpose of warn, error, and debug

-   ## config

```ts
import dotenv from 'dotenv';

//loading enviornmental variables
dotenv.config();
```

next:

```ts
//checking to see if process.env.SERVER_HOSTNAME exists, and if it doesnt, assing it the default value of localhost
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
//checking to see if process.env.SERVER_PORT exists, and if it doesnt, assign it the default value of 1337
const SERVER_PORT = process.env.SERVER_PORT || 1337;
```

next:

```ts
//creating server object with hostname and port defined from above
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

//creating a server object with the server defined above
const config = {
    server: SERVER
};
//essentially nesting objects for specificity
```

next:

```ts
//this will export the config object we just created but default will make all of the variables definied available to
//other files. for example you could now call 'config.server.port' in another file
export default config;
```

# Creating The Server

-   ## imports

```ts
//only new one, need http to connect to actual server
import http from 'http';

//importing package needed for this file
import express from 'express';

//importing from our config file so that we can use defined methods and object from them
import logging from './config/logging';
import config from './config/config';
```

next:

```ts
//NAMESPACE is going to be how we determine where our logs are comming from
const NAMESPACE = 'Server';
//router is going to be what defines our api behavior
const router = express();
```

-   ## logging

```ts
//injecting middleware into our software (modify, read, or just do something with the data thats being passed)
//it can end right there and return to the user or pass on to another middleware and then that does something
router.use((req, res, next) => {
    //logging info
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    //access response through middleware, listener for when response is finished
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    });

    //this is to pass the request onto the next stuff in the file
    next();
});
```

-   ## parsing the request

```ts
//after logging, we need to parse the body of the request using bodyParser

//allows us to send a nested json to the request, something that will probably be used in the future but not really now
router.use(express.urlencoded({ extended: false }));
//takes care of json.STRINGIFY or json.parse on REACT side for us
router.use(express.json());
```

-   ## rules of api

```ts
router.use((req, res, next) => {
    //first header means that our response can come from anyware, in real production this will be defined
    //as IPs and routes

    //the headers are giving whoever is sending a request access to request something from this api
    //unsure about what the specific header names due other that access-contorll-allow-origin
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //this is saying that if the user is trying to use a method such as a get request, then allow them access
    //and return the response status 200 which is the "success" status
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    //this is to pass the request onto the next stuff in the file
    next();
});
```

-   ## error handling

```ts
//if the api gets through all of our defined routes then it means that the user/program has entered an route that doesnt
// exist, so give them an error
router.use((req, res, next) => {
    const error = new Error('not found');

    //this means that we are returning a response status 404 which is the "page not found, file not found, etc. not
    //found" error. then we are creating a message key that is defined as our const error's message from above
    return res.status(404).json({
        message: error.message
    });
});
```

-   ## creating the actual server

```ts
//making a new object with the createServer method from http and pass in our router that contains all of our pre-defined
//routes, middle ware, and error handling that we just made
const httpServer = http.createServer(router);
```

next:

```ts
//server.listen() actually starts the HTTP server and makes it "listen" for the connection passed through which in our case
//is our config's server's port which is 1337 right now

//we are also passing in a callback function that will simply log that we are turning on the server and the ports connected
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
```

# Starting The Server

```
//using nodemon in the terminal, type to turn it on

nodemon source/server.ts
```

next: open postman to try to ping server by getting localhost:1337

# Controllers And Routes

the controllers are going to hold the functions and do what we want them to do on specific routes in the api. the routes  
are literally going to be the pathing it'll take to designate a controller call

make:  
source \ controllers  
source \ routes

-   ## controller example

```ts
//we import these so that we can put the neccessary types associated with these later
import { Request, Response, NextFunction } from 'express';
//import this too so that we can use the logging file to log where we are doing these specific actions from
import logging from '../config/logging';

//also show that the namespace for this file will be the example controller for logging purposes
const NAMESPACE = 'Sample Controller';
```

next:

```ts
//this is an example of the body to something you could do when a specific route is called
const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    //simply logging where this is coming from
    logging.info(NAMESPACE, `Sample health check route called.`);

    //as a response to this route getting requested, send a pong message back
    return res.status(200).json({
        message: 'pong'
    });
};
```

next:

```ts
//at the end of the file we need to export what we want to be send back to the request, which in this case is
//our sampleHealthCheck object. also we want to set the "default" tag because then we can access it like an
//object in other files
export default { sampleHealthCheck };
```

-   ## route example for our controller

```ts
import express from 'express';
//import our controller we just made so that we can call it in this specific route made for it
import controller from '../controllers/sample';
```

next:

```ts
//create a router
const router = express.Router();

//router.get defined that this is a get request for the path '/ping'
router.get('/ping', controller.sampleHealthCheck);
```

next:

```ts
//simply export the router defined
export = router;
```

-   ## how to use this route

go back in the server.ts file

```ts
//import the route we just made
import sampleRoutes from './routes/sample';
```

next:

```ts
//in a routes section of the server file

//'/sample' will show up before the ping and then we call our route, sampleRoutes, like an object
router.use('/sample', sampleRoutes);
```

in postman, if you now put /sample/ping after our localhost:1337, we will recieve the message "pong" back ;)

# Build

in the terminal, the command

```
npm run build
```

will compile the project in js which is ready to deploy.
