const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const amqplib = require('amqplib');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const os = require('os'); 
//const s3 = require("../../utils/s3.js")
const path = require('path');
const fastcsv = require('fast-csv');
const ApiUtils = require("../../../utils/ApiUtils.js")
const reportMessageClass = require("../../../messages/reportMessage.js")

// export to csv
router.get('/api/v1/exportcsv/:beginning/:end', async (req, res) => {
    //console.log(new Date(req.params.beginning.split(":")[1]));
    //console.log(new Date(req.params.end.split(":")[1]));
    //const printDate = new Date().getDate() + ":" + new Date().getMonth() + ":" + new Date().getFullYear();
    //console.log(printDate);
  
    const folderPath = '/var/www/html/report/watch-data-manuel-report/reportfolder/';
    const realPath = '/report/watch-data-manuel-report/reportfolder/';
    const filePath = 'output-' + req.params.beginning.split(":")[1] + '-' + req.params.end.split(":")[1] +'.csv';
  
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log('Folder created: ' + folderPath);
    } else {
      console.log('Folder already exists: ' + folderPath);
    }
   /* if (!fs.existsSync(filePath)) {
      // File doesn't exist, create it
      fs.writeFileSync(filePath, '', 'utf-8');
      console.log('File created: ' + filePath);
    } else {
      console.log('File already exists: ' + filePath);
    }*/
    fs.readdir(folderPath,async (err, files) => {  
      if (err) {
        console.error('Error reading folder: ' + err);
      } else {
        if (files.includes(filePath)) {
          console.log('The specific file exists in the folder');
          res.status(409).json({success : false, error : true, message : "file already created.", type:"file export", isseen: false , path: "https://watchdata.s3.eu-north-1.amazonaws.com/report/" + filePath})
          //res.status(403).json({success : false, error : true, message : "file created succesfully", type:"file export", isseen: false , path: "http://100.67.115.86" + realPath + '' + filePath})
        } else {
          console.log('The specific file does not exist in the folder');
          const dateRangeData = await prisma.analyzeData.findMany({
          take:1000,
          select: {
            userId: true,
            branchID: true,
            processID: true,
            eventTime: true,
            method: true,
            gender: true,
            age: true,
        //   createdAt: true
          },
    /*    where: {
            eventTime: {
              gte: req.params.beginning.split(":")[1],
              lte: req.params.end.split(":")[1]
            }
          }*/
        });
      //console.log(dateRangeData)
      delete dateRangeData[0];
  
      const filteredObj = Object.fromEntries(Object.entries(dateRangeData).filter(([_, v]) => v != null));
        //console.log(typeof filteredObj[1].eventTime)
      
  
      const csvWriter = createCsvWriter({
          path: folderPath + "/" + filePath,
          header: [
           { id: 'userId', title: 'userId' },
            { id: 'branchID', title: 'branchID'},
            { id: 'processID', title: 'processID'},
            { id: 'eventTime', title: 'eventTime'},
            { id: 'method', title: 'method'},
            { id: 'gender', title: 'gender'},
            { id: 'age', title: 'age'},
          ]
        });
  
        await csvWriter
        .writeRecords(Object.values(dateRangeData))
        .then(() => console.log('The CSV file was written successfully'));

        /* Read File */
        const fileContent = await fs.readFileSync(path.join(folderPath, filePath));
        //await console.log(fileContent)
        /* Amazon S3 - File Create */

        // Set the parameters for the S3 putObject method
         const params = {
          Bucket:'watchdata',
          Key: "report/" + filePath,
          Body: fileContent
        }
       
        // Upload the file to Amazon S3
       s3.putObject(params, function(err, data) {
          if (err) {
              console.log("Error uploading file to S3: ", err);
          } else {
              console.log("File uploaded successfully to S3");
          }
        });

        // Create a notification
        const createdNotification = await prisma.notification.create({
          data: {
            requestType: 'export to csv',
            requestParameter: { startdate: 'value' , enddate : 'value'},
            filename: filePath,
            fileExtension: 'csv',
            filePlace: 'sampleLocation',
            isSeen : false,
            userID: 1, // Replace with the actual user ID
            branchID: 1, // Replace with the actual branch ID
            processID: 1, // Replace with the actual process ID
          },
        });





  
        /* RabbitMQ - write message */
  
        const AMQP_USERNAME = process.env.AMQP_USERNAME || 'default_username';
        const AMQP_PASSWORD = process.env.AMQP_PASSWORD || 'default_password';
        const AMQP_HOST = process.env.AMQP_HOST || 'localhost';
        const connection = await amqplib.connect('amqp://localhost:5672');
        //const connectionURL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOST}:5672`;
  
        //const connection = await amqplib.connect(connectionURL);
        
        const channel = await connection.createChannel();
        
        await channel.assertQueue("report", { durable: true });
        channel.sendToQueue("report", Buffer.from("content is written."), { persistent: true });
  
        console.log("Message sent to the queue");
  
        setTimeout(() => {
          connection.close();
        
        }, 500);
  
  
        return ApiUtils.sendResponse(res, 200, true, false, "https://watchdata.s3.eu-north-1.amazonaws.com/report/" + filePath, reportMessageClass.fileCreated());
        //res.status(201).json({success : true, error : false, message : "file created succesfully", type:"file export", isseen: false , path: "https://watchdata.s3.eu-north-1.amazonaws.com/report/" + filePath})
        }
  
    }
  });
   
  });
 




  module.exports = router