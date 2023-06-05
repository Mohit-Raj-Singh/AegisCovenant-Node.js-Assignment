const express = require("express");
const { dataModel } = require("../model/dataModel");
const dataRouter = express.Router();

dataRouter.get("/", async (req, res) => {
    try {
        const data = await dataModel.find();
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.send({ "message": err.message });
    }
})



dataRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const newData = new dataModel(payload);
        await newData.save();
        res.send("Created")
    }
    catch (err) {
        console.log(err);
        res.send({ "msg": "wrong" })
    }
})



dataRouter.get('/:source/:destination/:date', async (req, res) => {
    const { source, destination, date } = req.params;

    try {
        const flights = await dataModel.find({ source, destination, date });
        let allFlight = {}
        for (let i = 0; i < flights.length; i++) {
            allFlight[flights[i].flight] = flights[i].price;
        }
        res.send(allFlight);
        // res.send(flights)
    }
    catch (err) {
        console.log(err);
    }


})

module.exports = { dataRouter };