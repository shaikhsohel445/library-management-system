const { dbConnection } = require("../../../db/database")

const fine = async (condition) => {
    var fineInfo = await dbConnection("user_book as ub")
        .select('ub.id', 'b.name', 'ub.issue_date', 'ub.expiry_date', 'ub.return_date', 'ub.fine')
        .where(condition)
        .leftJoin('books as b', 'b.book_id', 'ub.book_id')
        .orderBy('ub.id', 'desc')
    if (fineInfo.length > 0) {
        return { status: true, data: fineInfo }
    }
    else {
        return { status: false, message: "failed to find" }
    }
}
module.exports = { fine }