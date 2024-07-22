const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiUtils = require("../../../utils/ApiUtils.js")

const RegistrationMessagesClass = require("../../../messages/registrationMessages.js");
const loginMessageClass = require('../../../messages/loginMessages.js');
const logoutMessageClass = require("../../../messages/logoutMessages.js")



router.post('/api/v1/aregister', async (req, res) => {
    console.log(req.body);
  try {
    const { email, password, rePassword, roles } = req.body;

    // Check if passwords match
    if (password !== rePassword) {
      console.log("not matched");
      RegistrantionMessagesClass.doNotMatch()
      return ApiUtils.sendResponse(res, 400, false, true, null, RegistrationMessagesClass.doNotMatch());
1
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Admin instance with hashed password
    const newAdmin = await prisma.admin.create({
        data: {
            email: email,
            password: hashedPassword,
            roles: roles,
        }
    });

    return ApiUtils.sendResponse(res, 200, true, false, newAdmin, RegistrationMessagesClass.succesfulRegister());

  } catch (error) {
    console.error('Error during registration:', error);
    return ApiUtils.sendResponse(res, 500, false, true, null, error);

  }
});

// Login route
router.post('/api/v1/alogin', async (req, res) => {
    try {
      const { email, password, sessionExpireTime, sessionIsExpired } = req.body;
  
      // Find admin by email
      const admin = await prisma.admin.findUnique({ 
        where: { email } 
      });
      console.log(admin);
  
      // Check if admin exists and password is correct
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return ApiUtils.sendResponse(res, 401, false, true, null, loginMessageClass.invalidLogin());

      }
  
      // Generate a random token
      const token = crypto.randomBytes(32).toString('hex');
  
      // Create a login record
      const loginRecord = await prisma.login.create({
        data: {
            email,
            token,
            sessionExpireTime,
            sessionIsExpired
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
  router.delete('/api/v1/alogout', async (req, res) => {
    try {
     const cookie = req.headers.cookie;
      // Delete the login record
      // Assuming you have a way to associate login records with sessions, adjust this accordingly
      // For simplicity, this example deletes the last login record for the user
      if(cookie){
        const lastLoginRecord = await prisma.login.findMany({ where: { token: req.headers.cookie.split("=")[1] }});
        const deletedLoginRecord = await prisma.login.deleteMany({
            where: {
                token: lastLoginRecord[0].token,
            },
        });
        // Clear the cookie
        res.clearCookie('authToken');
        
        return ApiUtils.sendResponse(res, 200, true, false, deletedLoginRecord, logoutMessageClass.logoutSuccesful);
1
            
        }
        else{
          return ApiUtils.sendResponse(res, 400, false, true, null, logoutMessageClass.noActiveSession());

        }
    } catch (error) {
      console.error('Error during logout:', error);
      return ApiUtils.sendResponse(res, 500, false, true, null, error);

    }
  });



module.exports = router;