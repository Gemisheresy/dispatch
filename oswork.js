// Small function to grab the macaddress od the device

const os = require('os');
const getMacAddress = function(){
    let info = os.networkInterfaces();
    return info.awdl0[0].mac.toString()
};


exports.getMacAddress = getMacAddress;