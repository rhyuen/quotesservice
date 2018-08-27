const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./logger.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("../config.js");

module.exports = (app) => {    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser(config.secrets().cookieSecret, {
        httpOnly: true,
        maxAge: 3600
    }));
    app.use(morgan("dev")); 
    mongoose.connection.openUri(config.secrets().db, {useNewUrlParser: true})
        .once("open",  () => {                        
            console.log("db conn attempted");
        }).on("error", e => {
            logger.error(e);
            console.log("err");
        });
};