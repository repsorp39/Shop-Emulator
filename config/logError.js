const fsPromises = require("fs/promises");
const path = require("path");
const {format} = require("date-fns");

const logEvent = async  (err)=>{
    const date = format(new Date , "dd/MM/yyyy  hh:mm:ss");
    const data  = `${date}\t${err.name}:\t${err.message}\n\n`;
    await fsPromises.appendFile(
        path.join(__dirname , ".." , "logs" ,"errLogs.txt"),
        data
    );
}

module.exports = logEvent;