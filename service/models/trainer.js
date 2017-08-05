//Dependencies
let restful = require("node-restful");
let mongoose = restful.mongoose;

//Schema
let trainerSchema = new mongoose.Schema({
    name: String,
    feedback: [{
        title: String,
        date: String,
        traineeCount: Number,
        results: [{
            kScore: Number,
            rScore: Number,
            cScore: Number
        }]
    }]
});

//Return model
module.exports = restful.model("Trainers", trainerSchema);