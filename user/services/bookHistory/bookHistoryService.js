const bookHistoryRepository=require("../../../user/repository/bookHistory/bookHistoryRepository")

const bookHistory=async(body)=>{
    var bookData={
        user_id:body.id
    }
    var responseData=await bookHistoryRepository.find(bookData)
    return responseData
}

const find=async(condition)=>{
    var responseData=await bookHistoryRepository.find(condition)
    return responseData
}
module.exports={bookHistory,find}
