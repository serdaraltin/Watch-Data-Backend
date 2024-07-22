const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const amqplib = require('amqplib');
const ApiUtils = require("../../../utils/ApiUtils.js")
const commonCaseMessages = require("../../../messages/commonCaseMessages.js")



// POST /api/v1//companies - Add a new company
router.post('/api/v1//company', async (req, res) => {
  try {
    const newCompany = await prisma.company.create({
      data: req.body,
    });
    return ApiUtils.sendResponse(res, 201, true, false, newCompany, commonCaseMessages.createdSuccessfully());

  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, false, null, error);
  }
});

// PUT /api/v1//companies/:id - Update a company by ID
router.put('/api/v1//company/:id', async (req, res) => {
  const companyID = Number(req.params.id.split(":")[1]);
  console.log(companyID);

  try {
   const updatedCompany = await prisma.company.update({
      where: { id: companyID },
      data: req.body,
    });
    console.log(updatedCompany)
    return ApiUtils.sendResponse(res, 200, true, false, updatedCompany, commonCaseMessages.updated());
  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, false, null, error);
  }
});

// GET /api/v1//companies - Get all companies
router.get('/api/v1//companies', async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    return ApiUtils.sendResponse(res, 200, true, false, companies, commonCaseMessages.listed());

  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, false, null, error);
  }
});

// GET /api/v1//companies/:id - Get a company by ID
router.get('/api/v1/company/:id', async (req, res) => {
  const companyID = Number(req.params.id.split(":")[1]);
  console.log(companyID);

  try {
    const company = await prisma.company.findUnique({
      where: { id: companyID },  // <-- Corrected variable name here
    });

    if (!company) {
      return ApiUtils.sendResponse(res, 404, false, true, null, commonCaseMessages.noRecord());
      return;
    }
    console.log(company);
    //res.status(200).json(company);
    return ApiUtils.sendResponse(res, 200, true, false, company, commonCaseMessages.listed());
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    return ApiUtils.sendResponse(res, 500, false, false, null, error);
  }
});

// DELETE /api/v1//companies/:id - Remove a company by ID
router.delete('/api/v1//company/:id', async (req, res) => {
  const companyID = Number(req.params.id.split(":")[1]);
  console.log(companyID);

  try {
    const deletedCompany = await prisma.company.delete({
      where: { id: companyID },
    });
    return ApiUtils.sendResponse(res, 200, true, false, deletedCompany, commonCaseMessages.deleted());
  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, false, null, error);
  }
});
  


module.exports = router