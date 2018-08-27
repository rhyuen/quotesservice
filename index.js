const server = require("./server.js");
const logger = require("./common/logger.js");
const PORT = process.env.PORT || 9934;

process.on("uncaughtException", (err) => {  
    logger.error(`Uncaught Exception: ${err}`); 
    process.exit(1);    
});

server.listen(PORT, (err) => {
    if(err){
        logger.error(`Issue with the server. Error: ${err}`);
        return console.log(err);        
    }
    console.log(`Quotes Service: PORT ${PORT}`);
    
});