const { dbConnection } = require("../../../db/database")

const store = async (bookData) => {
    var bookData = await dbConnection("books")
        .insert(bookData)
        .returning('*')
    if (bookData.length > 0) {
        return { status: true, data: bookData }
    }
    else {
        return { status: false, message: "failed to store" }
    }
}

const find = async (condition) => {
    var bookData = await dbConnection("books")
        .where(condition)
    if (bookData.length > 0) {
        return { status: true, data: bookData }
    }
    else {
        return { status: false, message: "failed to find id" }
    }
}

const updateBooks = async (condition, updateInfo) => {
    var bookData = await dbConnection("books")
        .where(condition)
        .update(updateInfo)
        .returning('*')
    if (bookData.length > 0) {
        return { status: true, data: bookData }
    }
    else {
        return { status: false, message: "failed to find update" }
    }
}

// const bookStock = async (bookStockInfo) => {
//     var bookData = await dbConnection("books")
//         .select('books.book_id','books.number_of_books')
//         .where(bookStockInfo)
//     if (bookData.length > 0) {
//         return { status: true, data: bookData }
//     }
//     else {
//         return { status: false, message: "failed to find book" }
//     }
// }



module.exports = { store, find, updateBooks }