const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//const client = require("../../../../config/prisma/prismaConfig.js");
const moment = require('moment-timezone');

// Set the timezone to UTC+3
moment.tz.setDefault('Etc/GMT-3');

//hours
router.get('/api/v1/hours/:starttime/:endtime', async (req, res) => {
 
    console.log(req.params.starttime.split(":")[1]);
    console.log(req.params.endtime.split(":")[1]);
    const elapsedTimeInSeconds = process.hrtime()[0];
  
    let exitCounter = 0;
    let enterCounter = 0;
    let womanEnterCounter = 0;
    let womanExitCounter = 0;
    let manEnterCounter = 0;
    let manExitCounter = 0;
    let ageCounter = 0;

    let completed = false;
  
    let calculationArr = [];
   
    const currentDay = new Date().getDate();
    
    let reportData  = {};
    let resultArr = [];
    let result = []
    let average = 0;
    let mergedObj = [];
  
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    console.log(new Date(yesterday.setHours(4, 0, 0, 0)).toISOString()) 
    const hourlyData = await prisma.analyzeData.findMany({
      take: 1000,
      select: {
        userId: true,
        branchID: true,
        processID: true,
        eventTime: true,
        method: true,
        gender: true,
        age: true,
        createdAt: true,
      },
   /*   where: {
        OR: [
          {
          createdAt: {
          lte: new Date(yesterday.setHours(Number(req.params.starttime.split(":")[1]), 0, 0, 0)).toISOString(),
          gte: new Date(yesterday.setHours(Number(req.params.starttime.split(":")[1]), 0, 0, 0)).toISOString(),
          }
        }
          ]
         
      },*/
      
      /*  eventTime: {
          not: {
            equals: ""
          }
        }*/
      
    });
    const groupArray = hourlyData.reduce((acc, ele) => {
      
     // console.log(ele.createdAt.split("T")[1].substring(0,2));
      //if(ele){
        //if(ele.eventTime.includes(" ")){
        //if(Number(ele.eventTime.split(" ")[1].substring(0,2)) <= 21){
        
            const key = ele.eventTime.split(" ")[1];
            acc[key] = acc[key] || [];
            acc[key].push(ele);
       // }
     // }
      //}
      return acc;
    }, {});
 // console.log(groupArray)
  Object.values(groupArray).forEach((ele) =>{
    ele.forEach((ele2) => {
      var today = new Date();
      var currentDate = new Date();
      
      const todayTime = today.setHours(req.query.hours, 0, 0, 0);

      if(new Date().getTime() > todayTime){
        completed = true;
      }
      if(new Date().getTime() <= todayTime){
        completed = false;
      }
      
          
      if(ele2.method === "EXIT" || ele2.method === "exit"){
        exitCounter += 1;
      
  
      }
      else if(ele2.method === "ENTER" || ele2.method === "enter"){
        enterCounter += 1;
      
  
      }
      if(ele2.method === "EXIT" &&  ele2.gender === "male"){

        manExitCounter += 1;

      
  
      }
      else if(ele2.method === "ENTER" &&  ele2.gender === "male"){

        manEnterCounter += 1;
      }
      
      if(ele2.method === "EXIT" && ele2.gender === "Female" ){
        womanExitCounter += 1;
      
  
      }
      else if(ele2.method === "ENTER" && ele2.gender === "Female" ){
        womanEnterCounter += 1;
      }
      if(Number(ele2.age) > 50 && Number(ele2.age) < 65){
        ageCounter += 1;
        
    
        }
        console.log(ele2.eventTime)
        reportData = {
          starttime: ele2.eventTime.split(" ")[1].split(":")[1] + ":00",
          endTime : "0" + String(Number(ele2.eventTime.split(" ")[1].split(":")[1]) + 1) + ":00",
          timeLabel: ele2.eventTime.split(" ")[1].split(":")[1] + ":00",
          totalCustomers: {
            enter: enterCounter,
            exit: exitCounter,
            difference: exitCounter < enterCounter ? enterCounter - exitCounter : exitCounter - enterCounter,
          },
        
          difference: enterCounter - exitCounter,
          total : enterCounter,
   
          maleCustomers: {
            enter: manEnterCounter,
            exit: manExitCounter,
    
          },
          femaleCustomers: {
            enter: womanEnterCounter,
            exit: womanExitCounter,
           },
    
          isCompleted: completed,
          hourlyAverage : enterCounter / (enterCounter + exitCounter)

        };

 
    })




  mergedObj.push( reportData );
  });

  res.status(200).send({success : true, error : false,  result: mergedObj,  totalAverage : average  });
  

});

   // day data
router.get('/api/v1/day/:opening/:closing', async(req, res) => {
  const openingTime = req.params.opening.split(":")[1];
  const hoursToSet = Number(openingTime); // Convert the string to an integer
  
  const dateObject = new Date();
  dateObject.setHours(hoursToSet,0,0,0);
  
  console.log(dateObject);
  //console.log(new Date(req.params.closing.split(":")[1]))
  let exitCounter = 0;
  let enterCounter = 0;
  let womanEnterCounter = 0;
  let womanExitCounter = 0;
  let manEnterCounter = 0;
  let manExitCounter = 0;
  let ageCounter = 0; 

  let completed = false;
  const today = new Date();
  let calculationArr = [];
  let additionalData = {};
  const elapsedTimeInSeconds = process.hrtime()[0]; 

  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let reportData  = {};

  let average = 0;
  let mergedObj = [];
  let nullData = [];
  const now = new Date();
  const hourlyData = await prisma.person.findMany({
    where: {
      detection_time: {
        gte: new Date(new Date().setHours(req.params.opening.split(":")[1], 0, 0, 0)),
        lte: new Date(new Date().setHours(req.params.closing.split(":")[1], 0, 0, 0)),
      }
    },
    select: {
      id: true,
      detection_time: true,
      age: {
        select: {
          age_range: true
        }
      },
      enter_exit: {
        select: {
          event_type: true
        }
      },
      gender: {
        select: {
         gender: true
        }
      }
    }
  });
  console.log("hourly")
  console.log(hourlyData)

  const groupArray = hourlyData.reduce((acc, ele) => {

  //  if(ele){
  //    if(ele.eventTime.includes(" ")){
  //    if(Number(ele.eventTime.split(" ")[1].substring(0,2)) <= 21){
      
          const key =ele.detection_time.toDateString().split(" ")[1].substring(0,2);
          acc[key] = acc[key] || [];
          acc[key].push(ele);
   //   }
   // }
 // }
    return acc;
    }, {});

  Object.values(groupArray).forEach((ele) =>{
    ele.forEach((ele2) => {
      var today = new Date();
      var currentDate = new Date();
      console.log(ele2.gender[0].gender);
      const todayTime = today.setHours(req.query.hours, 0, 0, 0);

      if(new Date().getTime() > todayTime){
        completed = true;
      }
      if(new Date().getTime() <= todayTime){
        completed = false;
      }
      
      if(ele2.enter_exit[0].event_type === "exit" || ele2.enter_exit[0].event_type === "exit"){
        exitCounter += 1;
      
  
      }
      else if(ele2.enter_exit[0].event_type === "enter" || ele2.enter_exit[0].event_type === "enter"){
        enterCounter += 1;
      
  
      }
      if(ele2.enter_exit[0].event_type === "exit" &&  ele2.gender[0].gender === "male"){

        manExitCounter += 1;

      
  
      }
      else if(ele2.enter_exit[0].event_type === "enter" &&  ele2.gender[0].gender === "male"){

        manEnterCounter += 1;
      }
      
      if(ele2.enter_exit[0].event_type === "exit" && ele2.gender[0].gender === "female" ){
        womanExitCounter += 1;
      
  
      }
      else if(ele2.enter_exit[0].event_type === "enter" && ele2.gender[0].gender === "female" ){
        womanEnterCounter += 1;
      }
    /*  if(Number(ele2.age_range) > 50 && Number(ele2.age_range) < 65){
        ageCounter += 1;
        
    
        }*/
        reportData = {
          starttime: ele2.detection_time.toISOString().split("T")[1].substring(0,2) + ":00",
          endTime : String(Number(ele2.detection_time.toISOString().split("T")[1].substring(0,2)) + 1) + ":00",
          timeLabel: ele2.detection_time.toISOString().split("T")[1].substring(0,2) + ":00",
          totalCustomers: {
            enter: enterCounter,
            exit: exitCounter,
            difference: exitCounter < enterCounter ? enterCounter - exitCounter : exitCounter - enterCounter,
          },
        
          difference: enterCounter - exitCounter,
          total : enterCounter,
   
          maleCustomers: {
            enter: manEnterCounter,
            exit: manExitCounter,
    
          },
          femaleCustomers: {
            enter: womanEnterCounter,
            exit: womanExitCounter,
           },
    
          isCompleted: completed,
          hourlyAverage : enterCounter / (enterCounter + exitCounter)

        };

 
    })
  
    calculationArr.push(enterCounter);
    const sum = calculationArr.reduce((acc, curr) => acc + curr, 0);
    average = sum / 12; 
  

    
   
 
  })

 /*
  let hourArray = ["00","01","02","03","04","05","06","07","08","09" ,"10","11","12","13,","14","15","16","17", "18", "19", "20", "21", "22", "23"]

    
  hourArray.forEach((ele) => {
    if(!Object.keys(groupArray).includes(ele))
    {
      additionalData = {
        starttime: null,
        endtime: null,
        timeLabel: ele + ":00",
        totalCustomers: {
          enter: null,
          exit: null,
          difference: null,
        },
       
        difference: null,
        total : null,

        maleCustomers: {
          enter: null,
          exit: null,
       
        },
        femaleCustomers: {
          enter: null,
          exit: null,
     
        },
      
        hourlyAverage : null

      };
      nullData.push(additionalData);

      
    
    }
  })

  const obj = nullData.map((ele) => {
    return ele;
  })*/

 // mergedObj.push(...obj);;
 // mergedObj.sort((a, b) => {
    //console.log(typeof a.timeLabel);
    //console.log(typeof b.timeLabel);
  //  a.timeLabel.localeCompare(b.timeLabel);
  //})
  //console.log("sorted");
  //console.log(mergedObj);
  /*
  const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / (60 * 1000));

  
  const totalSpace = os.totalmem();
  const freeSpace = os.freemem();
  const usedSpace = totalSpace - freeSpace;
  const logs = {
      "currentTime": new Date().toString(),
      "apiExecutionTime": elapsedTimeInMinutes,
      "cpuUsage": JSON.stringify(process.cpuUsage()),
      "timeAccuracy": JSON.stringify(process.uptime()),
      "ramUsage": JSON.stringify(process.memoryUsage()),
      "totalSpace": JSON.stringify(totalSpace),
      "freeSpace": freeSpace,
      "usedSpace": JSON.stringify(usedSpace)
  };
  
  const headers = ["currentTime", "apiExecutionTime", "cpuUsage", "timeAccuracy", "ramUsage", "totalSpace", "freeSpace", "usedSpace"];

  // Check if the file exists
  if (!fs.existsSync('debugger/log-daily.csv')) {
    // Write the headers to the file
    const ws = fs.createWriteStream('debugger/log-daily.csv');
  
    fastcsv.write([Object.keys(logs)], { headers: true }).pipe(ws);
  
  
  }
 // Append the logs to the file
  const ws = fs.createWriteStream('debugger/log-daily.csv', { flags: 'a' });
  ws.write('\n');
  fastcsv.write([Object.values(logs)], { headers: false }).pipe(ws);
  
 */

  
    mergedObj.push( reportData );
 
  
  res.status(200).send({success : true, error : false, result: mergedObj, totalAverage : average});
});

// date range

router.get('/api/v1/daterange/:starttime/:endtime', async (req, res) => {
 
  console.log(req.params.starttime.split(":")[1]);
  console.log(req.params.endtime.split(":")[1]);
  const elapsedTimeInSeconds = process.hrtime()[0];

  let exitCounter = 0;
  let enterCounter = 0;
  let womanEnterCounter = 0;
  let womanExitCounter = 0;
  let manEnterCounter = 0;
  let manExitCounter = 0;
  let ageCounter = 0;

  let completed = false;

  let calculationArr = [];
 
  const currentDay = new Date().getDate();
  
  let reportData  = {};
  let resultArr = [];
  let result = []
  let average = 0;
  let mergedObj = [];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  console.log(new Date(yesterday.setHours(4, 0, 0, 0)).toISOString()) 
  const hourlyData = await prisma.analyzeData.findMany({
    take: 1000,
    select: {
      userId: true,
      branchID: true,
      processID: true,
      eventTime: true,
      method: true,
      gender: true,
      age: true,
      createdAt: true,
    },
    where: {
      OR: [
        {
        createdAt: {
        gte: req.params.starttime.split(":")[1],
        lte: req.params.endtime.split(":")[1],
        }
      }
        ]
       
    },
    
    /*  eventTime: {
        not: {
          equals: ""
        }
      }*/
    
  });
  const groupArray = hourlyData.reduce((acc, ele) => {
    
   // console.log(ele.createdAt.split("T")[1].substring(0,2));
    //if(ele){
      //if(ele.eventTime.includes(" ")){
      //if(Number(ele.eventTime.split(" ")[1].substring(0,2)) <= 21){
      
          const key = ele.eventTime.split(" ")[1];
          acc[key] = acc[key] || [];
          acc[key].push(ele);
     // }
   // }
    //}
    return acc;
  }, {});
// console.log(groupArray)
Object.values(groupArray).forEach((ele) =>{
  ele.forEach((ele2) => {
    var today = new Date();
    var currentDate = new Date();
    
    const todayTime = today.setHours(req.query.hours, 0, 0, 0);

    if(new Date().getTime() > todayTime){
      completed = true;
    }
    if(new Date().getTime() <= todayTime){
      completed = false;
    }
    
        
    if(ele2.method === "EXIT" || ele2.method === "exit"){
      exitCounter += 1;
    

    }
    else if(ele2.method === "ENTER" || ele2.method === "enter"){
      enterCounter += 1;
    

    }
    if(ele2.method === "EXIT" &&  ele2.gender === "male"){

      manExitCounter += 1;

    

    }
    else if(ele2.method === "ENTER" &&  ele2.gender === "male"){

      manEnterCounter += 1;
    }
    
    if(ele2.method === "EXIT" && ele2.gender === "Female" ){
      womanExitCounter += 1;
    

    }
    else if(ele2.method === "ENTER" && ele2.gender === "Female" ){
      womanEnterCounter += 1;
    }
    if(Number(ele2.age) > 50 && Number(ele2.age) < 65){
      ageCounter += 1;
      
  
      }
      console.log(ele2.eventTime)
      reportData = {
        starttime: ele2.eventTime.split(" ")[1].split(":")[1] + ":00",
        endTime : "0" + String(Number(ele2.eventTime.split(" ")[1].split(":")[1]) + 1) + ":00",
        timeLabel: ele2.eventTime.split(" ")[1].split(":")[1] + ":00",
        totalCustomers: {
          enter: enterCounter,
          exit: exitCounter,
          difference: exitCounter < enterCounter ? enterCounter - exitCounter : exitCounter - enterCounter,
        },
      
        difference: enterCounter - exitCounter,
        total : enterCounter,
 
        maleCustomers: {
          enter: manEnterCounter,
          exit: manExitCounter,
  
        },
        femaleCustomers: {
          enter: womanEnterCounter,
          exit: womanExitCounter,
         },
  
        isCompleted: completed,
        hourlyAverage : enterCounter / (enterCounter + exitCounter)

      };


  })




mergedObj.push( reportData );
});

res.status(200).send({success : true, error : false,  result: mergedObj,  totalAverage : average  });


});
router.get('/api/v1/fiemin', async(req, res) => {
  let exitCounter = 0;
  let enterCounter = 0;
  let womanEnterCounter = 0;
  let womanExitCounter = 0;
  let manEnterCounter = 0;
  let manExitCounter = 0;
  let ageCounter = 0;
  let lastEnterMale = [];
  let lastExitMale = [];
  let lastEnterFeMale = [];
  let lastExitFeMale = [];
  let maleLastEnter = 0;
  let maleLastExit = 0;
  let femaleLastEnter = 0;
  let femaleLastExit = 0;
  let mergedObj =  [];
  const elapsedTimeInSeconds = process.hrtime()[0]; 
  const aggregatedData = await prisma.analyzeData.groupBy({
    take: 1000,
    by: ['id','createdAt', 'method', 'gender', 'age'], // The field you want to group by

    select: {
      method: true,
      gender: true,
      age: true,
      createdAt: true
    },
    _count: {
      createdAt: true, // Perform a count of the grouped records
    },
    where: {
      method: {
        equals: "ENTER"
      }
    }
  });

  
  aggregatedData.map((data) =>{
    const createdAtDate = new Date(data.createdAt);
 
    // Convert the Date object back to a string without the millisecond part
    const createdAtWithoutMilliseconds = createdAtDate.toISOString().split("T")[1].split(".")[0];
    //console.log(createdAtWithoutMilliseconds); 
    // Update the createdAt value in the object
    data.createdAt = createdAtWithoutMilliseconds;
   
    return data;
  })
  const groupArray = aggregatedData.reduce((acc, obj) => {
   
    const timeString = obj.createdAt;
    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = parseInt(timeString.substring(3, 5), 10);
    const seconds = parseInt(timeString.substring(6, 8), 10);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    console.log("date")
    console.log(date.getTime());
    const key = String(Math.floor(date.getTime() / (5 * 60 * 1000)));
     // Round down to the nearest 5-minute interval
    if (!acc[key]) {
      acc[key] = [];
    }
    //console.log("obj")
    //console.log(obj);
    acc[key].push(obj);
    return acc;
  }, {});

  Object.values(groupArray).forEach((ele) =>{
    ele.forEach((ele2) => {
      var today = new Date();
      var currentDate = new Date();
     
      const todayTime = today.setHours(req.query.hours, 0, 0, 0);

  
      
          
      if(ele2.method === "EXIT" || ele2.method === "exit"){
        exitCounter += 1;
      
  
      }
      else if(ele2.method === "ENTER" || ele2.method === "enter"){
        enterCounter += 1;
      
  
      }
  if(ele2.method === "ENTER" &&  ele2.gender === "male"){

        manEnterCounter += 1;
      }
      

      else if(ele2.method === "ENTER" && ele2.gender === "female" ){
        womanEnterCounter += 1;
      }
 
        reportData = {
          startTime : ele2.createdAt.split(":")[0] + ":" + ele2.createdAt.split(":")[1] + ":" + ele2.createdAt.split(":")[1], 
          starttime: null,
          endTime : null,
          timeLabel: null,
          totalCustomers: {
            enter: enterCounter,
            exit: null,
            difference: null
          },
        
          difference: null,
          total : enterCounter,
          customerPercentage: {
            enter: null,
            exit: null,
          },
          maleCustomers: {
            enter: manEnterCounter,
            exit: null,
           percentage: {
              enter: null,
              exit: null,
            },
          },
          femaleCustomers: {
            enter: womanEnterCounter,
            exit: null,
            percentage: {
              enter: null,
              exit: null,
            },
          },
     
        };

      
    })
  
    
    console.log(reportData);

    
    mergedObj.push( reportData );
 
   
 

 
  })

  /*const elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / (60 * 1000));

  
  const totalSpace = os.totalmem();
  const freeSpace = os.freemem();
  const usedSpace = totalSpace - freeSpace;
  const logs = {
      "currentTime": new Date().toString(),
      "apiExecutionTime": elapsedTimeInMinutes,
      "cpuUsage": JSON.stringify(process.cpuUsage()),
      "timeAccuracy": JSON.stringify(process.uptime()),
      "ramUsage": JSON.stringify(process.memoryUsage()),
      "totalSpace": JSON.stringify(totalSpace),
      "freeSpace": freeSpace,
      "usedSpace": JSON.stringify(usedSpace)
  };
  
  const headers = ["currentTime", "apiExecutionTime", "cpuUsage", "timeAccuracy", "ramUsage", "totalSpace", "freeSpace", "usedSpace"];

  // Check if the file exists
  if (!fs.existsSync('debugger/log-fivemin.csv')) {
    // Write the headers to the file
    const ws = fs.createWriteStream('debugger/log-fivemin.csv');
  
    fastcsv.write([Object.keys(logs)], { headers: true }).pipe(ws);
  
  
  }
 // Append the logs to the file
  const ws = fs.createWriteStream('debugger/log-fivemin.csv', { flags: 'a' });
  ws.write('\n');
  fastcsv.write([Object.values(logs)], { headers: false }).pipe(ws);*/
    
  
    //console.log(totalArr);
    res.json(mergedObj);
})


router.get('/api/v1/week', async(req, res) => {
   
 console.log("weekly");
  let week =[];
  let finalArr = [];
  let avgArr = [];
  let exitCounter = 0;
  let enterCounter = 0;
  let womanEnterCounter = 0;
  let womanExitCounter = 0;
  let manEnterCounter = 0;
  let manExitCounter = 0;
  let ageCounter = 0;
  let dayAverageEnterCounter = 0;
  let results = [];
  let endOfTheDay = [];
  let responseData = {};
  const currentDay = new Date().getDate();

  const currentDate = new Date();
  const daysUntilMonday = (currentDate.getDay() + 7 - 1) % 7;
  const previousMonday = new Date(currentDate);
  previousMonday.setDate(currentDate.getDate() - daysUntilMonday);
 // console.log(previousMonday);
 // console.log(new Date(previousMonday.setDate(previousMonday.getDate() + 6)))
 //const weeklyData = await client.person.findMany({
const weeklyData = await prisma.person.findMany({
 /* where: {
    detection_time: {
      gte: new Date(previousMonday), // Filter for dates greater than or equal to the previous Monday
      lte: new Date(previousMonday.setDate(previousMonday.getDate() + 6))  // Filter for dates less than or equal to the following Sunday
    }
  },*/
  select: {
    id: true,
    detection_time: true,
    age: {
      select: {
        age_range: true
      }
    },
    enter_exit: {
      select: {
        event_type: true
      }
    },
    gender: {
      select: {
       gender: true
      }
    }
  }
});
  console.log(weeklyData);

  const groupArray = weeklyData.reduce((acc, ele) => {

    // Extract the day part from the datetime string
    const key = ele.detection_time.toString().split("T")[0].split(" ")[2]
    acc[key] = acc[key] || [];
    acc[key].push(ele);
    return acc;
  }, {});

  Object.values(groupArray).forEach((ele2) => {
    // console.log("------------------");
     ele2.forEach((row) =>{
      console.log(ele2[0].enter_exit[0].event_type)

     /*if(row.enter_exit === "1"){
   
       dayAverageEnterCounter += 1;
     }*/
    //   console.log(row);
    console.log("check")
    console.log(ele2[0].enter_exit[0].event_type === "exit" &&  ele2[0].gender[0].gender === "female");
    console.log( ele2[0].gender[0].gender)
    if(ele2[0].enter_exit[0].event_type === "exit" || ele2[0].enter_exit[0].event_type === "exit"){
      exitCounter += 1;
    

    }
    else if(ele2[0].enter_exit[0].event_type === "enter" || ele2[0].enter_exit[0][0].event_type === "enter"){
      enterCounter += 1;
    

    }
    if(ele2[0].enter_exit[0].event_type === "exit" &&  ele2[0].gender[0].gender === "male"){

      manExitCounter += 1;
      console.log(manExitCounter);

    

    }
    else if(ele2[0].enter_exit[0].event_type === "enter" &&  ele2[0].gender[0].gender === "male"){

      manEnterCounter += 1;
    }
    
    if(ele2[0].enter_exit[0].event_type === "exit" &&  ele2[0].gender[0].gender === "female"){
      womanExitCounter += 1;
    

    }
    else if(ele2[0].enter_exit[0].event_type === "exit" &&  ele2[0].gender[0].gender === "female"){
      womanEnterCounter += 1;
    }
   
     let isEndofDay = false;
     let x = 0;
    // Get the current date and time
     const currentDate = new Date();

     // Set the time to the end of the day (23:59:59)
     
     //endOfTheDay.push(row.createdAt.getTime())
     // Compare the current time with the end of the day
     /*if (row.createdAt.getTime() >= endOfDay.getTime()) {
       isEndofDay = true;
     } else {
       isEndofDay = false;
     }*/
     let total = 0;  
     if(Number(enterCounter) === Number(exitCounter)){
     
       total = 0;
     }
     else{
       
       total = enterCounter - exitCounter;
     }

    let dayOfWeek = new Date(row.detection_time);
  //  console.log(dayOfWeek.getDay());
    let dayStr = "";
   // console.log("dayOfWeek")
   if (dayOfWeek.getDay() === 1) {
    dayStr = "Pazartesi";
   }
   if (dayOfWeek.getDay() === 2) {
    dayStr = "Salı";
   }
   if (dayOfWeek.getDay() === 3) {
    dayStr = "Çarşamba";
   }
   if (dayOfWeek.getDay() === 4) {
    dayStr = "Perşembe";
   }
   if (dayOfWeek.getDay() === 5) {
    dayStr = "Cuma";
   }
   console.log(dayOfWeek)
   

    responseData = { 
       timeLabel: dayStr,
     //  dailyAverage : dayAverageEnterCounter / 7,
       currentDate : row.datetime,
       totalCustomers: {
         enter: enterCounter,
        // exit: exitCounter,
       },
       difference: total,
       totalCustomer : enterCounter,
      // customerCondition: exitCounter < enterCounter ? "Müşteri girişi daha fazladır." :
      //   exitCounter > enterCounter ? "Müşteri çıkışı daha fazladır." : "Giriş ve çıkış sayıları eşittir.",
         
    
       maleCustomers: {
         enter: manEnterCounter,
        // exit: manExitCounter,
       
       },
       femaleCustomers: {
         enter: womanEnterCounter,
        // exit: womanExitCounter,
       
       },
    /*   average: {
         average: {
           enter: enterCounter / enterCounter + exitCounter,
           exit: exitCounter / enterCounter + exitCounter,
         },
         maleCustomerAverage: {
           averate: {
             enter: manEnterCounter / enterCounter,
             exit: manExitCounter / exitCounter,
           },
         },
         femaleCustomerAverage :{
           averate: {
             enter: womanEnterCounter / enterCounter,
             exit: womanExitCounter / exitCounter,
           },
         }
       }*/
       ageCounter: ageCounter,
       isCompleted: isEndofDay
       };
       
     
     })
     //finalArr.push(responseData);
     //console.log(endOfTheDay);
     const endOfDay = new Date(currentDate);
     endOfDay.setHours(23, 59, 59, 999); // Set to the last millisecond of the day
     if (endOfTheDay[endOfTheDay.length - 1] >= endOfDay.getTime()) {
      isEndofDay = true;
    } else {
      isEndofDay = false;
    }
    let dailyAvg = enterCounter / 12;
    // avgArr.push(dayAverageEnterCounter);
//    response = {finalArr , isEndofDay, dailyAvg}
     // results.push(response);
   })
   results.push(responseData);
   return res.json({success : true, error : false, results: results})
});
//month
router.get('/month', async(req, res) => {

  let   hoursInADay = [];
  let finalArr = [];
  const currentDay = new Date().getDate();
  //console.log("currentDay" + currentDay)

  //console.log(req.query.spesifichours.split("-")[1]);
  const fileName = 'combined_file.csv';
  const rows = [];
  fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (row) => {
      // console.log(row);
      // Process each row and push it to the rows array
      if(typeof row.datetime.split(" ")[1] == "string"){
      // Create a new Date object
      // Note: Months in JavaScript are 0-indexed, so we subtract 1 from the month
      //var formattedDate = new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]);
    //  if (Number(row.datetime.split(" ")[1].substring(0, 2)) === currentDay) 
     // {
          //console.log(Number(row.datetime.split(" ")[1].substring(0, 2)));
        // Get the current date
     // Get the current date
      const currentDate = new Date();

      // Calculate the difference in days between the current day and Sunday (0-indexed)
    //  const daysUntilSunday = (currentDate.getDay() + 7 - 0) % 7;

      // Subtract the difference to get the date of the previous Sunday
     
        for(let i = 1; i <= 30; i = i + 6){
        
          if (Number(row.datetime.split(" ")[1].substring(0, 2)) === i) 
          {
                //console.log("i " + i);
                hoursInADay.push(row);
          }
          finalArr.push(hoursInADay);
          }
      }
     // }
  })

    
    
    .on('end', () => {
  
      const chunked = finalArr.slice(finalArr, 5);
      console.log("chunked");
      console.log(chunked);
      
    // Convert the array to a JSON-formatted string
    //const arrayAsString = JSON.stringify(finalArr, null, 2); // The third parameter (2) is for indentation

    // Specify the file path
    const filePath = 'output-month.json';

    // Write the string to the file
    fs.writeFileSync(filePath, JSON.stringify(chunked), 'utf-8');
      //const arrayAsString = finalArr.join(',');

      // Specify the file path
    
      // Write the string to the file
      //fs.writeFileSync(filePath, arrayAsString, 'utf-8');
      // Send the rows array as JSON in the response
      res.json(chunked[0]);

      // Alternatively, you can print the rows to the console
      //console.log(rows);
    })
    .on('error', (error) => {
      // Handle errors, e.g., file not found
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
  
});

// Time minux

router.get("/api/v1/currentTimeMinus/:timeMinus/:range", async (req, res) => {
 // 
  let mergedObj = [];
  let calculationArr = [];
  let exitCounter = 0;
  let enterCounter = 0;
  let womanEnterCounter = 0;
  let womanExitCounter = 0;
  let manEnterCounter = 0;
  let manExitCounter = 0;
  let ageCounter = 0;
  let completed = false;
  let average;

  const currentTime = new Date(new Date().setHours(new Date().getHours() + 3));
  const currentTimeMinus = new Date(new Date().setHours(new Date().getHours() + 3));
  currentTimeMinus.setMinutes(currentTimeMinus.getMinutes() - Number(req.params.timeMinus.split(":")[1]));
 // console.log(currentTimeMinus);
  //const currentTime = moment();
  //const currentTimeMinus = moment().subtract(Number(req.params.timeMinus.split(":")[1]), 'minutes');
  console.log(currentTime); // Default ISO 8601 representation in UTC+3
console.log(currentTimeMinus); // Default ISO 8601 representation in UTC+3
const data = await prisma.person.findMany({
  where: {
    detection_time: {
      gte: currentTimeMinus,
      lte: currentTime
    }
  },
  select: {
    id: true,
    detection_time: true,
  
    age: {
      select: {
        age_range: true
      }
    },
    enter_exit: {
      select: {
        event_type: true
      }
    },
    gender: {
      select: {
       gender: true
      }
    }
  }
});
//console.log(data[0].age[0].age_range);
  /*data.map((data) =>{
    const detection_time = new Date(data.detection_time);
 

    const createdAtWithoutMilliseconds = detection_time.split("T")[1].split(".")[0];

    data.createdAt = createdAtWithoutMilliseconds;
   
    return data;
  })*/
  
  const groupArray = data.reduce((acc, obj) => {
   
    const timeString = obj.detection_time.toISOString();
   // console.log(timeString)
    const hours = parseInt(timeString.substring(0, 2), 10);
  
    const minutes = parseInt(timeString.substring(3, 5), 10);
   
    const seconds = parseInt(timeString.substring(6, 8), 10);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
 
    const key = String(Math.floor(date.getTime() / Number(req.params.range.split(":")[1]) * 60 * 1000));

     // Round down to the nearest 5-minute interval
    if (!acc[key]) {
      acc[key] = [];
    }
    //console.log("obj")
    //console.log(obj);
    acc[key].push(obj);
    return acc;
  }, {});

  Object.values(groupArray).forEach((ele) =>{
    ele.forEach((ele2) => {
      console.log("ele2")
      console.log(ele2.enter_exit[0].event_type)
      console.log(ele2.gender[0].gender)
      var today = new Date();
      var currentDate = new Date();
      
      if(ele2.enter_exit[0].event_type === "EXIT" || ele2.enter_exit[0].event_type === "exit"){
        exitCounter += 1;
      
  
      }
      else if(ele2.enter_exit[0].event_type === "ENTER" || ele2.enter_exit[0].event_type === "enter"){
        enterCounter += 1;
      
  
      }
      if(ele2.enter_exit[0].event_type === "EXIT" &&  ele2.gender[0].gender === "male"){

        manExitCounter += 1;

      
  
      }
      else if(ele2.enter_exit[0].event_type === "ENTER" &&  ele2.gender[0].gender === "male"){

        manEnterCounter += 1;
      }
      
      if(ele2.enter_exit[0].event_type === "EXIT" && ele2.gender[0].gender === "Female" ){
        womanExitCounter += 1;
      
  
      }
      else if(ele2.enter_exit[0].event_type === "ENTER" && ele2.gender[0].gender === "Female" ){
        womanEnterCounter += 1;
      }
    /*  if(Number(ele2.age_range) > 50 && Number(ele2.age_range) < 65){
        ageCounter += 1;
        
    
        }*/
        reportData = {
         // starttime: ele2.eventTime.split(" ")[1].split(":")[0] + ":00",
         // endTime : String(Number(ele2.eventTime.split(" ")[1].split(":")[0]) + 1) + ":00",
         // timeLabel: ele2.eventTime.split(" ")[1].split(":")[0] + ":00",
         startTime : currentTimeMinus,
         endTime : currentTime,
         range : req.params.range.split(":")[1] + "min",
         totalCustomers: {
            enter: enterCounter,
            exit: exitCounter,
            difference: exitCounter < enterCounter ? enterCounter - exitCounter : exitCounter - enterCounter,
          },
        
          difference: enterCounter - exitCounter,
          total : enterCounter,
   
          maleCustomers: {
            enter: manEnterCounter,
            exit: manExitCounter,
    
          },
          femaleCustomers: {
            enter: womanEnterCounter,
            exit: womanExitCounter,
           },
    
          isCompleted: completed,
          hourlyAverage : enterCounter / (enterCounter + exitCounter)

        };

 
    })
  
    calculationArr.push(enterCounter);
    const sum = calculationArr.reduce((acc, curr) => acc + curr, 0);
    average = sum / 12; 
  

    
    mergedObj.push( reportData );
 
  });

 

 
  res.status(200).send({success : true, error : false, result: mergedObj, totalAverage : average});

});
router.get("/deneme", async(req, res) =>{

  const personsWithAge = await prisma.person.findMany({
    where: {
      detection_time: new Date()
    },
    select: {
      id: true,
      detection_time: true,
      age: {
        select: {
          age_field: true
        }
      }
    }
  });
  
  return res.json(personsWithAge);
})


  module.exports = router
