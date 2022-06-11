const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile_no: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm__password: {
        type: String,
        required: true
    }
})

// Bcrypt Hashing before storing to database
customerSchema.pre("save", async function(next){

    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);           // Bcrypt hashing with 10-rounds salting 
        this.confirm__password = undefined;
    }
    next();
})




// Creating Collection
const Registers = new mongoose.model("Detail",customerSchema);

module.exports = Registers;