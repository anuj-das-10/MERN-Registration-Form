const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Customers").then(() => {
    console.log(`Connection Successful!`);
}).catch((e) => {
    console.log(`No Connections!`);
})