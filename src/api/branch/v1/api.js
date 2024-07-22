const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
const ApiUtils = require("../../../utils/ApiUtils.js")
const commonCaseMessages = require("../../../messages/commonCaseMessages.js")


// POST /api/v1/branches - Add a new branch
router.post('/api/v1/branch', async (req, res) => {
  console.log(Number(req.body.id));
  console.log(req.body.name);
  console.log(req.body.location);
  try {
   const newBranch = await prisma.branch.create({
    data: {
      company: {
        connect: { id: Number(req.body.id) }
      },
      name: req.body.name,
      location: req.body.location,
    }
  })
    return ApiUtils.sendResponse(res, 200, true, false, branch,  commonCaseMessages.createdSuccessfully());
  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, true, branch,  error);
1
  }
});

// PUT /api/v1/branches/:id - Update a branch by ID
router.put('/api/v1/branch/:id', async (req, res) => {
  const branchId = Number(req.params.id.split(":")[1])

  try {
    const updatedBranch = await prisma.branch.update({
      where: { id: branchId },
      data: req.body,
    });
    return ApiUtils.sendResponse(res, 200, true, false, branch,  commonCaseMessages.updated());

  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, true, null,  error);

  }
});

// GET /api/v1/branches - Get all branches
router.get('/api/v1/branches', async (req, res) => {
  try {
    const branches = await prisma.branch.findMany();
    return ApiUtils.sendResponse(res, 200, true, false, branches,  commonCaseMessages.listed());
  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, true, null,  error);

  }
});

// GET /api/v1/branches/:id - Get a branch by ID
router.get('/api/v1/branches/:id', async (req, res) => {
  console.log(req.params.id)
  const branchId = Number(req.params.id.split(":")[1])

  try {
    const branch = await prisma.branch.findUnique({
      where: { id: branchId },
    });

    if (!branch) {
      return ApiUtils.sendResponse(res, 404, false, true, null,  commonCaseMessages.noRecord());
      return;
    }

    return ApiUtils.sendResponse(res, 200, true, false, branch,  commonCaseMessages.listed());
  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, true, null,  error);
  }
});

// DELETE /api/v1/branches/:id - Remove a branch by ID
router.delete('/api/v1/branches/:id', async (req, res) => {
  const branchId = Number(req.params.id.split(":")[1])

  try {
    const deletedBranch = await prisma.branch.delete({
      where: { id: branchId },
    });
    return ApiUtils.sendResponse(res, 200, true, false, deletedBranch,  commonCaseMessages.deleted());
  } catch (error) {
    return ApiUtils.sendResponse(res, 500, false, true, null,  error);

  }1
});

module.exports = router