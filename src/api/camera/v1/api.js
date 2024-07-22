const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const amqplib = require('amqplib');
const ApiUtils = require("../../../utils/ApiUtils.js")
const commonCaseMessages = require("../../../messages/commonCaseMessages.js")
const axios = require('axios');
const fetch = require("node-fetch");


router.post('/api/v1/camera', async (req, res) => {

    const {
        branchID,
        model,
        user,
        password,
        resolution,
        install_date,
        type,
        status,
        protocol,
        host,
        port,
        label,
        channel,
        aditional,
      } = req.body;
      console.log(req.body);
    
      try {
        // Create a new camera record using Prisma
        const newCamera = await prisma.camera.create({
          data: {
            /*branch :
            {
                connect:{
                  id:1
                } 
            },*/
            branchID : 1,
            model,
            user,
            password,
            resolution,
            install_date,
            type,
            status,
            protocol,
            host,
            port,
            label,
            channel,
            aditional,
          },
        });
      
        console.log('Created Camera:', newCamera);

        const cameraID = await newCamera.id;
        console.log('Camera ID:', cameraID);
      
        const url = "https://service.watchdata.ai/api/camera-start";
        //const url = "http://127.0.0.1:5000/api/camera_test"
      
        const data = {
          camera_id: cameraID,
        };
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            
            console.log('data:' + data.camera_id);
           // return response.json();  // You can parse the response body if needed
          })
    
          .catch(error => {
            console.error('Error in Fetch:');
          });
      
  
    
      return ApiUtils.sendResponse(res, 201, true, false, newCamera, commonCaseMessages.createdSuccessfully());


      } catch (error) {
        console.error('Error creating camera:', error);
        return ApiUtils.sendResponse(res, 500, false, true, null, error);

      }
});

router.get('/api/v1/cameras', async (req, res) => {
    try {
      const cameras = await prisma.camera.findMany();
      return ApiUtils.sendResponse(res, 200, true, false, cameras, commonCaseMessages.listed());
1
    } catch (error) {
      return ApiUtils.sendResponse(res, 500, false, true, null, error);
    }
});

router.get('/api/v1/camera/:id', async (req, res) => {
    const cameraID = parseInt(req.params.id.split(":")[1]);
    console.log(cameraID);
  
    try {
      const camera = await prisma.camera.findUnique({
        where: { id: cameraID },
      });
  
      if (camera) {
        return ApiUtils.sendResponse(res, 200, true, false, camera, commonCaseMessages.listed());

      } else {
        return ApiUtils.sendResponse(res, 404, false, true, null, commonCaseMessages.noRecord());

      }
    } catch (error) {
      return ApiUtils.sendResponse(res, 500, false, true, null, error);

    }
});

router.delete('/api/v1/camera/:id', async (req, res) => {
    const cameraID = parseInt(req.params.id.split(":")[1]);
  
    try {
      const camera = await prisma.camera.delete({
        where: { id: cameraID },
      });
  
      return ApiUtils.sendResponse(res, 200, true, false, camera, commonCaseMessages.deleted());


    } catch (error) {
      return ApiUtils.sendResponse(res, 500, false, true, null, error);
    }
});

router.put('/api/v1/camera/:id', async (req, res) => {
    const cameraID = parseInt(req.params.id.split(":")[1]);
  
    try {
      const {
        branchID,
        user,
        password,
        model,
        resolution,
        install_date,
        type,
        status,
        protocol,
        port,
        host,
        label,
        channel,
        adittional,
      } = req.body;
    
  
        const updatedCamera = await prisma.camera.update({
        where: { id: cameraID },
        data: {
          /*branch :
          {
              connect:{
                id:1
              } 
          },*/
          branchID : 1,
          model,
          user,
          password,
          resolution,
          install_date,
          type,
          status,
          protocol,
          host,
          port,
          label,
          channel,
          adittional
        },
      });
  
      return ApiUtils.sendResponse(res, 200, true, false, updatedCamera, commonCaseMessages.updated());

    } catch (error) {
      return ApiUtils.sendResponse(res, 500, false, true, null, error);
    }
});

module.exports = router
  1