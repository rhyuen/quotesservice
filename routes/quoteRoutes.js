const express = require("express");
const Quote = require("../models/quote.js");
const wrapAsync = require("../common/util.js");
const router = express.Router();

router.get("/", wrapAsync(async(req, res) => {    
    const variable = await req.query.author;
    const search = variable ? {author: variable} : {};
    const data = await Quote.find(search);        
    const quoteCount = await Quote.count(search);
    res.status(200).json({
        data, 
        count: quoteCount
    });    
}));

router.post("/", wrapAsync(async(req, res) => {    
    const text = req.body.text;
    const author = req.body.author;
    const latestQuote = new Quote({
        text: text,
        author: author
    });        
    const data = await latestQuote.save()
    res.status(201).json({
        message: "Success, new Quote added.", 
        details: data
    });    
}));


module.exports = router;