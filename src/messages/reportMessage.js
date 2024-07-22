const { report } = require("../api/camera/v1/api")

class reportMessageClass{
    static fileCreated = () => {
        return "File created succesfully."
    }
}

module.exports = reportMessageClass;