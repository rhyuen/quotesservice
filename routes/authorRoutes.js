const express = require("express");
const Quote = require("../models/quote.js");

const router = express.Router();

router.get("/", async(req, res) => {
    res.status(200).json({
        message: "hi, authors route"
    });
});

router.get("/:author", async (req, res) => {
    const searchParam = (req.params.author) ? {author: req.params.author}: {};
    const quotes = await Quote.find(searchParam);
    res.status(200).json({
        author: req.params.author, 
        quotes
    });
});

module.exports = router;