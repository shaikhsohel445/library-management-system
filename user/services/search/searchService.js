const serachRepository=require("../../../user/repository/search/searchRepository")

const search=async(condition)=>{
var responseData=await serachRepository.search(condition)
return responseData
}
module.exports={search}