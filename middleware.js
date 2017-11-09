const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config.js");

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(logger("dev")); 
    mongoose.connect(config.mongo, () => {
        console.log("db conn attempted.")
    });

};