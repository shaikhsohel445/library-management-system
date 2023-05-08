const { dbConnection } = require("../../../db/database")

const login = async (condition) => {
    var loginData = await dbConnection("user")
        .where(condition)
    if (loginData.length > 0) {
        return { status: true, data: loginData }
    }
    else {
        return { status: false, message: 'cannot login' }
    }
}
module.exports = { login }