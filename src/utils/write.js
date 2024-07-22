const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const  localCreatedAt  = require("./utils.js")
const csvtojson = require('csvtojson');

const cssToJson = async () =>{
  csvtojson()
  .fromFile('./convert/exmaple_data_yearly_3_branch.csv')
  .then((jsonObj) => {
    fs.writeFile('./convert/exampledata.json', JSON.stringify(jsonObj), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('JSON object written to file');
      }
    });
  });
}


const writingFunc = async function(){

const jsonData = fs.readFileSync('/var/www/html/report/watch-data-manuel-report/src/convert/exampledata.json'); // Read the JSON file
const dataArray = JSON.parse(jsonData); // Parse the JSON data into an array of objects
let counter = 0;
//console.log(dataArray.data)
//console.log(Object.values(dataArray)[0])
for (const data of dataArray)  {
  counter++;
  
  console.log(counter);
 // console.log("current counter: " + counter)
 // console.log(data);
  await prisma.analyzeData.create({ // Create a record in the table for each object
    data: {
      userId: Number(data.userId),
      branchID: Number(data.branchID),
      processID: Number(data.processID),
      eventTime: data.eventTime,
      method: data.method,
      gender: data.gender,
      age: String(data.age),
      hourInfo : data.hourInfo,
      createdAt: localCreatedAt(new Date().toISOString()),
    
    },
  });
}
//console.log(jsonData);
}
//cssToJson();
writingFunc()