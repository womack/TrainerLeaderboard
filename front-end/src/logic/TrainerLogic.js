//jesus christ please refactor me at some point
let getAverageScore = (trainersObj, date) => {
  let trainersAverages = {
    names: [],
    results: {
      kScore: [],
      rScore: []
    }
  };
  //each trainer
  for (let i = 0; i < trainersObj.length; i++) {
    let rScoretrainerCourseAverages = 0,
      kScoretrainerCourseAverages = 0;
    //each course/week
    let j = 0,
      rScoreCount = 0,
      kScoreCount = 0;
    for (j = 0; j < trainersObj[i].feedback.length; j++) {
      //if date has been passed as an arg, and the current week does not contian it, skip it.
      if (date && !trainersObj[i].feedback[j].date.includes(date)) {
        continue;
      }
      //kScore
      let kScoreavgFromWeek = getAverageFromWeek(trainersObj[i].feedback[j].results, "kScore");
      if (kScoreavgFromWeek !== -1) {
        kScoretrainerCourseAverages += kScoreavgFromWeek;
        kScoreCount++;
      }
      //rScore
      let rScoreavgFromWeek = getAverageFromWeek(trainersObj[i].feedback[j].results, "rScore");
      if (rScoreavgFromWeek !== -1) {
        rScoretrainerCourseAverages += rScoreavgFromWeek;
        rScoreCount++;
      }
    }

    if (rScoreCount || kScoreCount) {
      let kScoretrainerResult = kScoretrainerCourseAverages / kScoreCount;
      let rScoretrainerResult = rScoretrainerCourseAverages / rScoreCount;
      trainersAverages.names.push(trainersObj[i].name);
      trainersAverages.results.kScore.push(kScoretrainerResult);
      trainersAverages.results.rScore.push(rScoretrainerResult);
    }
  }
  return trainersAverages;
};


let getAverageFromWeek = (week, data) => {
  let courseResultAverages = 0,
    count = 0;
  //each result
  for (let i = 0; i < week.length; i++) {
    if (week[i][data]) {
      courseResultAverages += (week[i][data]);
      count++;
    }
  }
  if (count > 0) {
    return courseResultAverages / count;
  }
  //If there was actually any results from this week
  else {
    return -1;
  }
};


module.exports = {
  getAverageScore
};
