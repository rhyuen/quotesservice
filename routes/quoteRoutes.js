const express = require("express");
const Quote = require("../models/quote.js");
const router = express.Router();

router.get("/", async(req, res) => {
    try{                
        const variable = await req.query.author;
        const search = variable ? {author: variable} : {};
        const data = await Quote.find(search);        
        const quoteCount = await Quote.count(search);
        await res.status(200).json({data, count: quoteCount});
    }catch(e){
        console.log(e);
    }
});

router.post("/", async(req, res) => {
    try{
        const text = req.body.text;
        const author = req.body.author;
        const latestQuote = new Quote({
            text: text,
            author: author
        });        
        latestQuote.save().then(data => {
            console.log(latestQuote);
            res.status(200).json({message: "success", details: data});
        }).catch(e => {
            console.log(e);
        });      
    }catch(e){
        console.log(e);
    }
});


module.exports = router;