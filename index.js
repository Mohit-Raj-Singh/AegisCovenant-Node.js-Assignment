const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dataRouter } = require("./routes/dataRoutes");
const { connection } = require("./config/db");

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json());

app.get("/", (req, res) => {
    res.send("use endpoint 'flight' for all flights")
})

app.use("/flight", dataRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    }
    catch (err) {
        console.log("Error in connection");
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`);
})