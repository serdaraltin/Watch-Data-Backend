const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const ApiUtils = require("../../../utils/ApiUtils.js")
const RegistrationMessagesClass = require("../../../messages/registrationMessages.js");
const loginMessageClass = require('../../../messages/loginMessages.js');
const logoutMessageClass = require("../../../messages/logoutMessages.js")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// Register route
router.post('/api/v1/register', async (req, res) => {
  try {
    const { branchID, username, password, rePassword, email, full_name, role } = req.body;

    // Check if passwords match
    if (!password) {
      return ApiUtils.sendResponse(res, 400, false, true, null, "Password is required.");
    }
    if (password !== rePassword) {
      return ApiUtils.sendResponse(res, 400, false, true, null, RegistrationMessagesClass.doNotMatch());
    }

    // Hash the password using bcrypt
    const password_hash = await bcrypt.hash(password, 10);

    // Create a new AppUser instance
    const newAppUser = await prisma.appUser.create({
      data: {
        branchID,
        username,
        password_hash,
        email,
        full_name,
        role,
      }
    });

    return ApiUtils.sendResponse(res, 201, true, false, newAppUser, RegistrationMessagesClass.succesfulRegister());
  } catch (error) {
    console.error('Error during registration:', error);
    return ApiUtils.sendResponse(res, 500, false, true, null, error);
  }
});

// Login route
router.post('/api/v1/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by username
    const user = await prisma.appUser.findMany({ where: { email } });
    console.log("user")
    console.log(user)
    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user[0].password_hash))) {
      return ApiUtils.sendResponse(res, 401, false, true, null, loginMessageClass.invalidLogin());
    }

    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex');

    // Create a login record
    const loginRecord = await prisma.login.create({
      data: {
        email,
        token,
      }
    });

    // Set a cookie with the token
    res.cookie('authToken', token, { httpOnly: true });

    return ApiUtils.sendResponse(res, 200, true, false, loginRecord, loginMessageClass.succesfulLogin());
  } catch (error) {
    console.error('Error during login:', error);
    return ApiUtils.sendResponse(res, 500, false, true, null, error);
  }
});

// Logout route
router.delete('/api/v1/logout', async (req, res) => {
  try {
    // Delete the login record
    // Assuming you have a way to associate login records with sessions, adjust this accordingly
    // For simplicity, this example deletes the last login record for the user
    const lastLoginRecord = await prisma.login.findMany({ where: { token: req.headers.cookie.split("=")[1] }});
  

    if (!lastLoginRecord) {
      return ApiUtils.sendResponse(res, 400, false, true, null, logoutMessageClass.noActiveSession());
    }

    const deletedLoginRecord = await prisma.login.deleteMany({
      where: {
          token: lastLoginRecord[0].token,
      },
    });;

    // Clear the cookie
    res.clearCookie('authToken');

    return ApiUtils.sendResponse(res, 200, true, false, lastLoginRecord, logoutMessageClass.logoutSuccesful());
  } catch (error) {
    console.error('Error during logout:', error);
    return ApiUtils.sendResponse(res, 500, false, true, null, error);
  }
});

// Add more routes or middleware as needed

module.exports = router;