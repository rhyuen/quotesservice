const server = require("./server.js");
const winston = require("winston"); 
const PORT = process.env.PORT || 9934;

process.on("uncaughtException", (err) => {  
    winston.log("error", `Uncaught Exception: ${err}`);    
    process.exit(1);    
});

process.on("uncaughtRejection", async (err, promise) => {
    winston.log("error", `Uncaught Rejection: ${err}`);    
    process.exit(1);
});

server.listen(PORT, async (err) => {
    try{
        console.log(`Quotes Service: PORT ${PORT}`);
    }catch(e){
        console.log(err);
    }
});