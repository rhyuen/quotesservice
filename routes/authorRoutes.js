const express = require("express");
const Quote = require("../models/quote.js");
const wrapAsync = require("../common/util.js");

const router = express.Router();

router.get("/", wrapAsync(async(req, res) => {
    res.status(200).json({
        path: "/author/",
        date: new Date(),        
        message: "Authors Route",
        options: "/:authorname to see all quotes by a given author."
    });
}));

router.get("/:author", wrapAsync(async (req, res) => {
    const searchParam = (req.params.author) ? {author: req.params.author}: {};

    //TODO:instead of returning all the quotes.  //return author not found.

    const quotes = await Quote.find(searchParam);
    res.status(200).json({
        path: "/author",
        date: new Date(),
        message: "GET Request on /author",
        author: req.params.author, 
        data: quotes
    });
}));

module.exports = router;