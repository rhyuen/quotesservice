const express = require("express");
const Quote = require("./models/quote.js");
const app = express();
const middleware = require("./middleware.js");

middleware(app);

app.get("/", async (req, res) => {
    try{
        res.status(200).json({message: "hi"});
    }catch(e){
        console.log(e);
    }
});

app.get("/quotes", async(req, res) => {
    try{
        res.status(200).json({
            text: "quote 1",
            author: "random author"
        });
    }catch(e){
        console.log(e);
    }
});

app.post("/quotes", async(req, res) => {
    try{
        const text = req.body.text;
        const author = req.body.author;
        const latestQuote = new Quote({
            text: text,
            author: author
        });        
        latestQuote.save((err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(latestQuote);
                res.status(200).json({message: "success", details: data});
            }
        });
    }catch(e){

    }
});




module.exports = app;