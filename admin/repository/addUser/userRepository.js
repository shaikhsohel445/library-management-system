const { dbConnection } = require("../../../db/database")

const find = async (condtion) => {
    var userData = await dbConnection("user")
        .where(condtion)
    if (userData.length > 0) {
        return { status: true, data: userData }
    }
    else {
        return { status: false, message: "cannot find email" }
    }
}

const addUser = async (userInfo) => {
    var userData = await dbConnection("user")
        .insert(userInfo)
        .returning("*")//It is used for returning data
    if (userData.length > 0) {
        return { status: true, data: userData }
    }
    else {
        return { status: false, message: "failed to insert data" }
    }

}

const userDataDropdown = async () => {
    var userDataInfo = await dbConnection("user as u")
        .select('u.id', 'u.name')
        .orderBy('id','desc')
    if (userDataInfo.length > 0) {
        return { status: true, data: userDataInfo }
    }
    else {
        return { status: false, message: "failed to find data" }
    }
}

const userRepository = async () => {
    var userDataInfo = await dbConnection("user")
        .select('*')
    if (userDataInfo.length > 0) {
        return { status: true, data: userDataInfo }
    }
    else {
        return { status: false, message: "failed to find data" }
    }
}
module.exports = { find, addUser, userDataDropdown, userRepository }