const { dbConnection } = require("../../../db/database")

const login = async (condition) => {
    var loginData = await dbConnection("admin")
        .where(condition)
    if (loginData.length > 0) {
        return { status: true, data: loginData }
    }
    else {
        return { status: false, message: "email doesnot exists" }
    }

}

module.exports = { login }