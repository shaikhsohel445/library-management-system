const bookHistoryService = require("../../../user/services/bookHistory/bookHistoryService")


const bookHistory = async (req, res) => {
    const responseData=await bookHistoryService.bookHistory(req.body)
    res.send({"status":"200","message":"success",responseData})
}

module.exports = { bookHistory }