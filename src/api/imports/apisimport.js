const notification = require('../notificaation/v1/api.js');
const report = require("../report/v1/api.js")
const dashboard = require("../dashboard/v1/api.js")
const camera = require("../camera/v1/api.js")
const admin = require("../admin/v1/api.js")
const company  = require("../company/v1/api.js")
const branch = require("../branch/v1/api.js")
const user = require("../../api/user/v1/api.js")

module.exports = {notification, report, dashboard, camera, admin, company, branch, user}