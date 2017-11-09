const mongoose = require("mongoose");
const server = require("./server.js");
const PORT = process.env.NODE_ENV || 9934;

process.on("UncaughtException", async (err) => {
    try{      
        console.log("uncaughtexception");
    }catch(e){
    }
});

server.listen(PORT, async (err) => {
    try{
        console.log(`Quotes Service: PORT ${PORT}`);
    }catch(e){
        console.log(err);
    }
});