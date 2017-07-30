//Dependencies
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let expressLogging = require("express-logging");
let logger = require("logops");


//MongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://192.168.0.10/leaderboardDB", { useMongoClient: true });

//Express
let app = express();
let port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Logging
app.use(expressLogging(logger));


//Routes
app.use("/api", require("./routes/api"));

//Starting Server
app.listen(port);
console.log(`Running on ${port}`); 