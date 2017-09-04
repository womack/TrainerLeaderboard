//Dependencies
const restful = require("node-restful");
const mongoose = restful.mongoose;

//Schema
const trainerSchema = new mongoose.Schema({
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