const express = require("express");
const fetch = require("node-fetch");
const Quote = require("./models/quote.js");
const authorRoutes = require("./routes/authorRoutes.js");
const quoteRoutes = require("./routes/quoteRoutes.js");
const app = express();
const wrapAsync = require("./common/util.js");
const middleware = require("./middleware.js");

middleware(app);

async function useAuthService(req, res, next){
    if(!req.headers.authorization && !req.cookies["authservice_token"]){
        console.log("No authorization header or no req.cookies['authservice_token'] %s", req.cookies['authservice_token']);        

        //TODO: if client is api, send error message
        //TODO: if client is browser, redirect.
        return res.redirect("http://localhost:7690/login");
    }    
    const authTokenForHeader = req.cookies["authservice_token"] || req.headers.authorization;
    console.log("token: " + authTokenForHeader);
    const options = {
        method: "GET",
        headers: {"Authorization": `Bearer ${authTokenForHeader}`}        
    };
    
     const authRes = await fetch("http://localhost:5789/auth", options);
     console.log("Result Status: %s | Result redirected from %s", authRes.status, authRes.url);
     
     if(authRes.status === 400 || authRes.status === 401){
        const error = new Error("Credentials are not valid for access to this resource.");
        error.httpStatusCode = authRes.status;        
        throw error;
     }        
    next();    
}

//disabling auth for now.
app.use(wrapAsync(useAuthService));

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
    console.log("Quotes Service Error Handler");
    res.json({
        message: "Something went wrong.", 
        error: err.message,
        code: err.httpStatusCode
    });    
});

module.exports = app;