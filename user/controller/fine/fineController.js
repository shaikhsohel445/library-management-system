const fineService=require("../../../user/services/fine/fineService")



const userFine=async(req,res)=>{
 

    const responseData=await fineService.fine(req.body)
    res.send({"status":"200","message":"success",responseData})

}

module.exports={userFine}