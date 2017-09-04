//Utility functions
//Parse a number to two decimal places
let twoDecimalPlaces = (val) => {
    return parseInt(val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
};

//Check if a value exists
let doesExist = (val) => {
    if (val !== undefined || val !== null)
        return false;
    else
        return true;
};

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

//Determine the average of an attribute given a weeks data.
let getAverageFromWeek = (week, data) => {
    let courseResultAverages = 0, count = 0;
    //each result
    week.forEach((result) => {
        if (result[data]) {
            courseResultAverages += (result[data]);
            count++;
        }
    });
    //Return the average score for that data for the week, or return -1 to signifiy there wasn't any data that week.
    if (count > 0) { return courseResultAverages / count; }
    else { return -1; }
};

//Given a feedback array, will add a tqi attribute to each objecet in that array.
let determineTQI = (feedback) => {
    feedback.map((a) => {
        a.tqi = TQIFromWeek(a.results);
    });
};

//Return the TQI for a results array passed, to two decimals.
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

let getRanking = (parsedResults, data) => {

    //Construct an array of objects with names/scores
    let trainerStats = [];
    for (let i = 0; i < parsedResults.names.length; i++) {
        let tmpTrainer = {
            name: parsedResults.names[i],
            score: parsedResults.results[data][i].toFixed(2)
        };
        // tmpTrainer.score = twoDecimalPlaces(tmpTrainer.score);
        trainerStats.push(tmpTrainer);
    }
    //Sort array by scores, descending
    trainerStats.sort((a, b) => b.score - a.score);
    return trainerStats;
}


module.exports = {
    getAverageScore,
    getAverageFromWeek,
    getFeedback,
    determineTQI,
    determineAverages,
    getRanking
};