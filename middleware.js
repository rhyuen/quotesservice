const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config.js");

//set mongoClient or createConnection()

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(logger("dev")); 
    mongoose.connection.openUri(config.mongo)
        .once("open",  () => {
            console.log("db conn attempted");
        }).on("error", e => {
            console.log("err");
        });
};