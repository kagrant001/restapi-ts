import dotenv from 'dotenv';

//loading enviornmental variables for me
dotenv.config();

//checking to see if process.env.SERVER_HOSTNAME exists, and if it doesnt, assing it the default value of localhost
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
//checking to see if process.env.SERVER_PORT exists, and if it doesnt, assign it the default value of 1337
const SERVER_PORT = process.env.SERVER_PORT || 1337;

//creating server object with hostname and port defined from above
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

//creating a server object with the server defined above
const config = {
    server: SERVER
};

//this makes it so you can access config.server.port from another file
export default config;
