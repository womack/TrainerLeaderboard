// Dependencies
let express = require("express");
let router = express.Router();

// Models
let trainer = require("../models/trainer");

// Routes
trainer.methods(["get", "put", "post", "delete"]);
trainer.register(router, "/trainers");

// Return router
module.exports = router;