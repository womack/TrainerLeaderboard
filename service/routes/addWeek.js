let trainer = require("../models/trainer");

exports.addWeek = function (req, res, next) {
    console.log(req, next);
    trainer.findOneAndUpdate({ name: req.name }, { $push: { feedback: req.feedback } });
    next();
};