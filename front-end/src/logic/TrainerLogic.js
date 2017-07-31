let getFeedback = (trainer) => {
    return trainer[0].feedback;
}

//probably just used for tqi unless i rework the trainer object schema
let getData = (trainersObj, data = "tqi") => {
    let tqi, j, tqiObj = [];
    for (let i = 0; i < trainersObj.length; i++) {
        tqi = 0;
        for (j = 0; j < trainersObj[i].feedback.length; j++) {
            tqi += (trainersObj[i].feedback[j][data]);
        }
        tqiObj.push(tqi / j);
    }
    return tqiObj;
}

let getGraphLabels = (trainersObj) => {
    let labels = [];
    for (let i = 0; i < trainersObj.length; i++) {
        labels.push(trainersObj[i].name);
    }
    return labels;
}

let getAverageScore = (trainersObj, data) => {
    let trainersAverages = [];
    for (let i = 0; i < trainersObj.length; i++) {
        let trainerCourseAverages = 0;
        for (var j = 0; j < trainersObj[i].feedback.length; j++) {
            let courseResultAverages = 0;
            for (var ij = 0; ij < trainersObj[i].feedback[j].results.length; ij++) {
                courseResultAverages += (trainersObj[i].feedback[j].results[ij][data]);
            }
            trainerCourseAverages += (courseResultAverages / ij);
        }
        trainersAverages.push(trainerCourseAverages / j);
    }
    return trainersAverages;
}


module.exports = {
    getFeedback,
    getData,
    getGraphLabels,
    getAverageScore
}