//Dependencies
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let expressLogging = require("express-logging");
let logger = require("logops");
let cors = require("cors");
let trainer = require("./models/trainer");

//MongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/leaderboardDB", { useMongoClient: true });

//Express
let app = express();
let port = 3000;
let whitelist = ["http://blog.realcouncil.com", "http://86.13.102.175", "http://192.168.0.23"];
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Logging
app.use(expressLogging(logger));

//Routes
app.use("/api", require("./routes/api"));
app.put("/addWeek", (req, res) => {
    trainer.findOneAndUpdate({ "name": req.body.name }, { $push: { "feedback": req.body.feedback } }, { new: true }, (err, resp) => {
        if (err) { return res.send(err); }
        res.send("Added Successfully");
    });
});

//Starting Server
app.listen(port);
console.log("Running on ${port}"); 