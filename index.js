const mongoose = require("mongoose");
const server = require("./server.js");
const PORT = process.env.NODE_ENV || 9934;

process.on("uncaughtException", async (err) => {
    try{      
        console.log("uncaughtexception");
    }catch(e){
    }
});

process.on("uncaughtRejection", async (err, promise) => {
    console.log(err);
});

server.listen(PORT, async (err) => {
    try{
        console.log(`Quotes Service: PORT ${PORT}`);
    }catch(e){
        console.log(err);
    }
});