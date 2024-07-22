// apiUtils.js

class ApiUtils {
    static sendResponse(res, statusCode, success, error, data, message) {
      res.status(statusCode).json({
        success,
        error,
        response: success ? data : null,
        message: message || (success ? 'Operation successful' : 'Operation failed'),
      });
    }
  }
  
  module.exports = ApiUtils;