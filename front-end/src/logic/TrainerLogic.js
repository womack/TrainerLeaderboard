let getFeedback = (trainer) => {
    return trainer[0].feedback;
}

//probably just used for tqi unless i rework the trainer object schema
let getData = (trainersObj, data = "tqi", date) => {
    let tqi, tqiObj = [];
    for (let i = 0; i < trainersObj.length; i++) {
        tqi = 0;
        for (var j = 0, count = 0; j < trainersObj[i].feedback.length; j++) {
            //if date has been passed as an arg, and the current week does not contian it, skip it.   
            if (!!date && !trainersObj[i].feedback[j].date.includes(date)) {
                continue;
            }
            tqi += (trainersObj[i].feedback[j][data]);
            count++;
        }
        tqiObj.push(tqi / count);
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

let getAverageScore = (trainersObj, data, date) => {
    let trainersAverages = [];
    //each trainer
    for (let i = 0; i < trainersObj.length; i++) {
        let trainerCourseAverages = 0;
        //each course/week
        for (var j = 0, count = 0; j < trainersObj[i].feedback.length; j++) {
            //if date has been passed as an arg, and the current week does not contian it, skip it.
            if (date && !trainersObj[i].feedback[j].date.includes(date)) {
                continue;
            }
            trainerCourseAverages += getAverageFromWeek(trainersObj[i].feedback[j].results, data);
            count++;
        }
        trainersAverages.push(trainerCourseAverages / count);
    }
    return trainersAverages;
}


let getAverageFromWeek = (week, data) => {
    let courseResultAverages = 0;
    //each result
    for (var i = 0; i < week.length; i++) {
        courseResultAverages += (week[i][data]);
    }
    return courseResultAverages / i;
}


module.exports = {
    getFeedback,
    getData,
    getGraphLabels,
    getAverageScore
}