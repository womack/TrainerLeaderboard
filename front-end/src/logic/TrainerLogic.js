let getFeedback = (trainer) => {
    return trainer[0].feedback;
};

let getAverageScore = (trainersObj, date) => {

    let trainersAverages = { names: [], results: { kScore: [], rScore: [], tqi: [] } };
    trainersObj.forEach((currentTrainer) => {
        let trainerCourseMonthAverageRScore = 0, trainerCourseMonthAverageKScore = 0, trainerCourseMonthAverageTQI = 0;
        let rScoreCount = 0, kScoreCount = 0;
        let filteredTrainerFeedback = currentTrainer.feedback;//JSON.parse(JSON.stringify(currentTrainer.feedback));//Object.assign([], currentTrainer.feedback);

        //filter out results that arent of the current date, if passed.
        if (date) {
            filteredTrainerFeedback = filteredTrainerFeedback.filter((individualFeedback) => {
                return individualFeedback.date.includes(date)
            });
        }
        filteredTrainerFeedback.forEach((currentTrainerFeedback) => {
            let kScoreAvgFromWeek = getAverageFromWeek(currentTrainerFeedback.results, "kScore");
            if (kScoreAvgFromWeek !== -1) {
                trainerCourseMonthAverageKScore += kScoreAvgFromWeek;
                kScoreCount++;
            }
            let rScoreAvgFromWeek = getAverageFromWeek(currentTrainerFeedback.results, "rScore");
            if (rScoreAvgFromWeek !== -1) {
                trainerCourseMonthAverageRScore += rScoreAvgFromWeek;
                rScoreCount++;
            }
            trainerCourseMonthAverageTQI += TQIFromWeek(currentTrainerFeedback.results);
        });

        //If it actually found any data, add to graph usable object
        if (rScoreCount || kScoreCount) {
            trainersAverages.names.push(currentTrainer.name);
            trainersAverages.results.kScore.push(trainerCourseMonthAverageKScore / kScoreCount);
            trainersAverages.results.rScore.push(trainerCourseMonthAverageRScore / rScoreCount);
            trainersAverages.results.tqi.push((trainerCourseMonthAverageTQI / rScoreCount) / 10);
        }
    });
    return trainersAverages;
};

let getAverageFromWeek = (week, data) => {
    let courseResultAverages = 0, count = 0;
    //each result
    for (let i = 0; i < week.length; i++) {
        if (week[i][data]) {
            courseResultAverages += (week[i][data]);
            count++;
        }
    }
    if (count > 0) { return courseResultAverages / count; }
    else { return -1; }
};

let determineTQI = (feedback) => {
    feedback.map((a) => {
        a.tqi = TQIFromWeek(a.results);
    });
};

let TQIFromWeek = (week) => {
    let detractors = 0, promoters = 0, neutral = 0;
    week.forEach((element) => {
        if (doesExist(element.rScore)) { return; }
        else if (element.rScore > 8) { promoters++; }
        else if (element.rScore < 7) { detractors++; }
        else { neutral++; }
    });
    return twoDecimalPlaces(((promoters - detractors) / (detractors + promoters + neutral)) * 100);
};

let determineAverages = (feedbacks) => {
    feedbacks.map((a) => {
        a.avgK = twoDecimalPlaces(getAverageFromWeek(a.results, "kScore"));
        a.avgR = twoDecimalPlaces(getAverageFromWeek(a.results, "rScore"));
    });
};

let twoDecimalPlaces = (val) => {
    return parseInt(val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
};

let doesExist = (val) => {
    if (val !== undefined || val !== null)
        return false;
    else
        return true;
};

module.exports = {
    getAverageScore,
    getAverageFromWeek,
    getFeedback,
    determineTQI,
    determineAverages
};