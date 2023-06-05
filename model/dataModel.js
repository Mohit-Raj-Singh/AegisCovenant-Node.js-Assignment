const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    source: String,
    destination: String,
    date: String,
    flight: String,
    price: String,
});


const dataModel =mongoose.model("data",dataSchema)

module.exports = { dataModel };