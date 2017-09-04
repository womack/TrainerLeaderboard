//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLogging = require("express-logging");
const logger = require("logops");
const cors = require("cors");
const trainer = require("./models/trainer");

//MongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/leaderboardDB", { useMongoClient: true });

//Express
const app = express();
const port = 3000;
const whitelist = ["http://blog.realcouncil.com", "http://86.13.102.175", "http://192.168.0.23"];
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Logging
app.use(expressLogging(logger));

//Routes
app.use("/api", require("./routes/api"));
app.put("/addWeek", (req, res) => {
    console.log(req.body);
    trainer.findOneAndUpdate({ "name": req.body.name }, { $push: { "feedback": req.body.feedback[0] } }, { new: true }, (err, resp) => {
        if (err) { return res.send(err) };
        res.send("Added Successfully");
    });
});

//Starting Server
app.listen(port);
console.log(`Running on ${port}`); 