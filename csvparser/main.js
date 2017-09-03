//Dependencies
const csvtoJson = require("csvtojson");
const fs = require("fs");
const request = require("request");
const readlineSync = require("readline-sync");

//Find files - format expects a dash then a date,
// with either anonymous or feedback in the title.  - "./anonymous-feedback-comments-240717.csv";
fs.readdir("./", (err, items) => {
    let filesToDo = [];
    //
    items.forEach((a) => {
        if (a.toLowerCase().includes("anonymous") || a.toLowerCase().includes("feedback")) {
            let filePath = __dirname + "\\" + a;
            let date = "";
            date = filePath.substring(filePath.lastIndexOf("."), filePath.lastIndexOf("-") + 1);
            filesToDo.push({ fp: filePath, cb: parseTrainers, date });
        }
    });
    readCSV(filesToDo);

    // for (let i = 0; i < items.length; i++) {
    //     if (items[i].toLowerCase().includes("anonymous") || items[i].toLowerCase().includes("feedback")) {
    //         filePath = __dirname + "\\" + items[i];
    //         date = filePath.substring(filePath.lastIndexOf("."), filePath.lastIndexOf("-") + 1);
    //         debugger;
    //         readCSV(filePath, parseTrainers);
    //     }
    // }

});

let readCSV = (filesToDo) => {
    filesToDo.forEach(({ fp, cb, date }) => {
        let jsonData = [];
        csvtoJson().fromFile(fp).on("json", (jsonObj) => {
            for (let key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    //Deleted non-desired fields
                    if (jsonObj[key].includes("#N/A") || key.includes("field") || (!key.includes("Perf") && !key.includes("Knowl") && !key.includes("Name") && !key.includes("Title") && !(key === "Ov"))) {
                        delete jsonObj[key];
                    }
                }
            }
            jsonObj.date = date;
            if (!jsonObj["Name"].includes("Project") && (jsonObj.hasOwnProperty("Knowl") || jsonObj.hasOwnProperty("Perf") || jsonObj.hasOwnProperty("Ov"))) { jsonData.push(jsonObj); }
        }).on("done", (error) => {
            if (error) { console.log(error); }
            cb(jsonData);
        });
    })

};
//delete a property from an object but return what it was, tidying objects.
let deleteAndReturn = (data, property) => {
    let tmp = data[property];
    delete data[property];
    return tmp;
};

let parseTrainers = (jsonData) => {
    let trainerMap = new Map();
    for (let i = 0; i < jsonData.length; i++) {
        if (trainerMap.has(jsonData[i].Name)) {
            trainerMap.get(deleteAndReturn(jsonData[i], "Name")).push(jsonData[i]);
        }
        else {
            trainerMap.set(deleteAndReturn(jsonData[i], "Name"), [jsonData[i]]);
        }
    }
    parseFeedback(trainerMap);
};

let parseFeedback = (trainerMap) => {
    //trainer list
    // let postArray = [];
    // let putArray = [];
    let addArray = [];

    trainerMap.forEach((value, key, map) => {
        let feedbackArray = [];
        let feedbackObj = {
            title: value[0].Title,
            date: value[0].date,
            traineeCount: value.length,
            results: []
        }
        //result list
        value.forEach((b) => {
            let result = {
                kScore: b.Knowl,
                rScore: b.Perf,
                cScore: b.Ov
            };
            feedbackObj.results.push(result);
        });
        feedbackArray.push(feedbackObj);

        console.log(value[0].date);
        let answer = readlineSync.question(`Are you posting or putting ${key}? `);
        if (answer.toLowerCase() === "post" || answer.toLowerCase() === "put") {
            //      postArray.push({ name: key, feedback: feedbackArray });
            addArray.push({ name: key, feedback: feedbackArray, ans: answer.toLowerCase() })
        }
        // else if (answer.toLowerCase() === "put") {
        //     putArray.push({ name: key, feedback: feedbackObj });
        // }
    });
    // parseIntoTrainerObj({ postArray, putArray });
    parseIntoTrainerObj(addArray);
};

// let parseIntoTrainerObj = ({ postArray, putArray }) => {
let parseIntoTrainerObj = (addArray) => {
    addArray.forEach((a) => {
        if (a.ans === "post") { addRequest(a, "post", "http://192.168.0.23:3000/api/trainers"); }
        else if (a.ans === "put") { addRequest(a, "put", "http://192.168.0.23:3000/addWeek"); }

    });
    // postArray.forEach((a) => {
    //     addRequest(a), "post", "http://192.168.0.23:3000/api/trainers";
    // });
    // putArray.forEach((a) => {
    //     addRequest(a, "put", "http://192.168.0.23:3000/addWeek");
    // });
};
let trimObjOfProperty = (obj, prop) => {
    delete obj[prop];
    return obj;
}
let addRequest = (trainerObj, typeOfRequest, url) => {
    console.log(`${typeOfRequest.toUpperCase()}ING ${trainerObj.name}`);
    let options = {
        method: typeOfRequest,
        body: trimObjOfProperty(trainerObj, "ans"),
        json: true,
        url
    }
    request(options, (err, res, body) => {
        if (err) {
            console.error("error posting json: ", err);
            throw err;
        }
        console.log("statusCode: ", res.statusCode);
    })
    console.log(JSON.stringify(options.body, null, 2));
}
