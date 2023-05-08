const { dbConnection } = require("../../../db/database")

const search = async (condition) => {
    var searchData = await dbConnection("books")
        .where(condition)
        
    if (searchData.length > 0) {
        return { status: true, data: searchData }
    }
    else {
        return { status: false, message: "failed to find data" }
    }


}
module.exports = { search }