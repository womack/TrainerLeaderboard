//Dependencies
const csvtoJson = require("csvtojson");
const fs = require("fs");
const request = require("request");
const readlineSync = require("readline-sync");

let filePath = "", date = "";

//Find file - "./anonymous-feedback-comments-240717.csv";
fs.readdir("./", (err, items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].toLowerCase().includes("anonymous") || items[i].toLowerCase().includes("feedback")) {
            filePath = __dirname + "\\" + items[i];
        }
    }
    date = filePath.substring(filePath.lastIndexOf("."), filePath.lastIndexOf("-") + 1);
    debugger;
    readCSV(filePath, parseTrainers);
});

let readCSV = (fp, cb) => {
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
    let postArray = [];
    let putArray = [];

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
        console.log(date);
        let answer = readlineSync.question(`Are you posting or putting ${key}? `);
        if (answer.toLowerCase() === "post") {
            postArray.push({ name: key, feedback: feedbackArray });
        }
        else if (answer.toLowerCase() === "put") {
            putArray.push({ name: key, feedback: feedbackObj });
        }
    });
    parseIntoTrainerObj({ postArray, putArray });
};

let parseIntoTrainerObj = ({ postArray, putArray }) => {
    postArray.forEach((a) => {
        addRequest(a), "post", "http://192.168.0.23:3000/api/trainers";
    });
    putArray.forEach((a) => {
        addRequest(a, "put", "http://192.168.0.23:3000/addWeek");
    });
};

// let postReq = (trainerObj) => {
//     let options = {
//         method: "post",
//         body: trainerObj,
//         json: true,
//         url: "http://192.168.0.23:3000/api/trainers"
//     }
//     request(options, (err, res, body) => {
//         if (err) {
//             console.error("error posting json: ", err);
//             throw err;
//         }
//         console.log("statusCode: ", res.statusCode);
//     })
// };
// let putReq = (trainerObj) => {
//     let options = {
//         method: "put",
//         body: trainerObj,
//         json: true,
//         url: "http://192.168.0.23:3000/addWeek"
//     }
//     request(options, (err, res, body) => {
//         if (err) {
//             console.error("error posting json: ", err);
//             throw err;
//         }
//         console.log("statusCode: ", res.statusCode);
//     })
// };

let addRequest = (trainerObj, typeOfRequest, url) => {
    console.log(`${typeOfRequest.toUpperCase()}ING ${trainerObj.name}`);
    let options = {
        method: typeOfRequest,
        body: trainerObj,
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
}
