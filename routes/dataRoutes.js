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





dataRouter.get('/:source/:destination/:date', async (req, res) => {
    const { source, destination, date } = req.params;

    try {
        const flights = await dataModel.find({ source, destination, date });
        if (flights.length === 0) {
            res.send(`Cannot find any flight between ${source} to ${destination} on ${date}`);
        }
        else {
            let allFlight = {}
            for (let i = 0; i < flights.length; i++) {
                allFlight[flights[i].flight] = flights[i].price;
            }
            res.send(allFlight);
        }
    }
    catch (err) {
        console.log(err);
    }


})

module.exports = { dataRouter };