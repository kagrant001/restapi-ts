"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
//loading enviornmental variables for me
dotenv_1.default.config();
//checking to see if process.env.SERVER_HOSTNAME exists, and if it doesnt, assing it the default value of localhost
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
//checking to see if process.env.SERVER_PORT exists, and if it doesnt, assign it the default value of 1337
var SERVER_PORT = process.env.SERVER_PORT || 1337;
//creating server object with hostname and port defined from above
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
//creating a server object with the server defined above
var config = {
    server: SERVER
};
//this makes it so you can access config.server.port from another file
exports.default = config;
