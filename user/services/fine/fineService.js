const fineRepository=require("../../../user/repository/fine/fineRepository")
const moment=require("moment")

const fine=async(body)=>{
    var info={
        user_id:body.id
    }
    
    var responseData= await fineRepository.fine(info)
    var totalDetails=responseData.data
    var listingObject= totalDetails.map((item)=>{
        var obj={
            id:item.id,
            book_name:item.name,
            issue_date:item.issue_date?moment(item.issue_date).format('YYYY-MM-DD') : '',
            expiry_date:item.expiry_date?moment(item.expiry_date).format('YYYY-MM-DD') : '',
            return_date:item.return_date?moment(item.return_date).format('YYYY-MM-DD') : '',
            fine:item.fine
        }
        return obj
    })
    var fineInfo= await Promise.all(listingObject)
    return fineInfo
}
module.exports={fine}