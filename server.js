const express = require("express");
const fetch = require("node-fetch");
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = promisify(jwt.verify);
const Quote = require("./models/quote.js");
const authorRoutes = require("./routes/authorRoutes.js");
const quoteRoutes = require("./routes/quoteRoutes.js");
const {extServices, secrets} = require("./config.js");
const app = express();
const wrapAsync = require("./common/util.js");
const middleware = require("./middleware.js");

middleware(app);

async function useAuthService(req, res, next){
    if(!req.headers.authorization && !req.cookies["authservice_token"]){
        console.log("No authorization header or no req.cookies['authservice_token']");        
        //TODO: if client is browser, redirect. TODO: if client is api, send error message
        return res.redirect(`${extServices().auth}/login`);
    }    
    const authTokenForHeader = req.cookies["authservice_token"] || req.headers.authorization;    
    const options = {
        method: "GET",
        headers: {"Authorization": `Bearer ${authTokenForHeader}`}        
    };
        
     const authRes = await fetch(`${extServices().auth}/auth`, options);
     console.log("Result Status: %s | Result redirected from %s", authRes.status, authRes.url);
     
     if(authRes.status === 400 || authRes.status === 401){
        const error = new Error("Credentials are not valid for access to this resource.");
        error.httpStatusCode = authRes.status;        
        throw error;
     }        
    next();    
}

async function isTokenAuthedToRscStandAlone(req, res, next){
    try{        
        if(!req.headers.authorization && !req.cookies["authservice_token"]){
            const error = new Error("No authorization header or no JWT in cookie.");
            error.status = 400;
            throw error;
        }                                
        
        const identityToValidate = req.cookies["authservice_token"] || req.headers.authorization.split(" ")[1];
        console.log(identityToValidate);
        const validationResult = await jwtVerify(identityToValidate, secrets().jwtSecret)
            .catch(e => {
                console.error("JWT token verification failed. Error: %s", e);            
            });                       
        console.log(validationResult);
        return next(); 
    }catch(e){
        console.log("There was an AuthZ Error\n %s", e);
        if(e.name === "JsonWebTokenError"){
            return res.status(401).json({
                message: "Wrong signature for your token.",
                error: e
            });
        }
        if(e.name === "TokenExpiredError"){
            return res.status(401).json({
                message: "You need to sign in. Your token is expired.",
                error: e
            });
        }                                         
        return res.status(401).json({
            message: "An unexpected case for your auth happened.",
            error: e
        });
    }    
}

// //AuthZ using AuthProxy Service
// app.use(wrapAsync(useAuthService));
//AuthZ using Indep Service
app.use(wrapAsync(isTokenAuthedToRscStandAlone));

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
    res.status(500).json({
        message: "Something went wrong.", 
        date: new Date().toLocaleString(),
        error: err.message,
        code: err.httpStatusCode
    });    
});

module.exports = app;