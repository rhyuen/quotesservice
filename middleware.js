const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config.js");
const winston = require("winston");

module.exports = (app) => {
    winston.add(winston.transports.File, {filename: "my_error_log.log"});    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser(config.secrets().cookieSecret, {
        httpOnly: true,
        maxAge: 3600
    }));
    app.use(logger("dev")); 
    mongoose.connection.openUri(config.secrets().db)
        .once("open",  () => {
            console.log("db conn attempted");
        }).on("error", e => {
            console.log("err");
        });
};