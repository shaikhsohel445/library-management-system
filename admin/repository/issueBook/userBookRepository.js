var { dbConnection } = require("../../../db/database")

const userBookStore = async (userBookData) => {
    var userBookData = await dbConnection("user_book")
        .insert(userBookData)
        .returning("*")
    if (userBookData.length > 0) {
        return { status: true, data: userBookData }
    }
    else {
        return { status: false, message: "failed to store" }
    }
}

const bookHistoryTrack = async () => {
    var bookData = await dbConnection("user_book as ub")
        .select('ub.id', 'u.name', 'ub.issue_date', 'ub.booking_id','ub.return_date')
        .leftJoin('user as u', 'u.id', 'ub.user_id')
        .orderBy('ub.id', 'desc')
    if (bookData.length > 0) {
        return { status: true, data: bookData }
    }
    else {
        return { status: false, message: "failed to list data" }
    }
}

const find = async (condition) => {
    var bookData = await dbConnection("user_book")
        .where(condition)
    if (bookData.length > 0) {
        return { status: true, data: bookData }
    }
    else {
        return { status: false, message: "failed to store" }
    }
}

const bookSubmit = async (condition,bookData) => {
    var bookInfo = await dbConnection("user_book")
    .where(condition)
    .update(bookData)
    .leftJoin('user as u','u.id','user_book.user_id')
    .returning('*')
    if (bookInfo.length > 0) {
        return { status: true, data: bookInfo }
    }
    else {
        return { status: false, message: "failed to store" }
    }
}

const constInfoUpdate=async(constData)=>{
    var constInfo=await dbConnection("user_book")
    .update(constData)
    .returning("*")
    if (constInfo.length > 0) {
        return { status: true, data: constInfo }
    }
    else {
        return { status: false, message: "failed to cost" }
    }
}

module.exports = { userBookStore, bookHistoryTrack, find,bookSubmit,constInfoUpdate }