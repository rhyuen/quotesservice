const express = require("express");
const Quote = require("./models/quote.js");
const authorRoutes = require("./routes/authorRoutes.js");
const quoteRoutes = require("./routes/quoteRoutes.js");
const app = express();
const middleware = require("./middleware.js");

middleware(app);

app.use("/author", authorRoutes);
app.use("/quotes", quoteRoutes);
app.get("/", wrapAsync(async (req, res) => {        
    res.status(200).json({
            route: "/",
            message: "Welcome to my quotes service.",
            routes: "Routes available are /author and /quotes"
    });    
}));

app.get("*", wrapAsync(async (req, res, next) => {    
    res.status(404).json({
        route: "notfound",
        message: "This route doesn't exist"
    });
}));

app.use((err, req, res, next) => {    
        console.log("error handler")
        res.json({
            message: "Something went wrong.", 
            error: err.message
        });    
});

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(next);
    };
}

module.exports = app;