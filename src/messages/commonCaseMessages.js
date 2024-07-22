class DataMessageClass {
    static createdSuccessfully = () => {
        return "Data is/are created successfully.";
    }

    static listed = () => {
        return "Data is/are listed.";
    }
    static updated = () => {
        return "Data is/are updated.";
    }
    static deleted = () => {
        return "Data is/are deleted.";
    }
    static noRecord = () => {
        return "no record found";
    }
}

module.exports = DataMessageClass;