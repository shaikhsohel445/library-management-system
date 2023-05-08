var { dbConnection } = require("../../../db/database")
// const bookHistory = async (bookData) => {

//     var bookHistoryInfo = await dbConnection("user_book as ub")
//         .select('ub.book_id', 'b.name')
//         .where(bookData)
//         .leftJoin('books as b', 'b.book_id', 'ub.book_id')
//     if (bookHistoryInfo.length > 0) {
//         return { status: true, data: bookHistoryInfo }
//     }
//     else {
//         return { status: false, message: "failed" }
//     }

// }

const find = async (condtion) => {
    var bookHistory = await dbConnection("user_book as ub")
    .select('ub.book_id', 'b.name')
        .where(condtion)
        .leftJoin('books as b', 'b.book_id', 'ub.book_id')
    if (bookHistory.length > 0) {
        return { status: true, data: bookHistory }
    }
    else {
        return { status: false, message: "failed" }
    }

}

module.exports={find}