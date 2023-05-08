const fineRatesRepository=require("../../repository/fineRates/fineRatesRepository")

const fineRates=async(body)=>{
    var fineData={
        from_day:body.from_day,
        to_day:body.to_day,
        cost:body.to_day
    }
    var responseData=await fineRatesRepository.fineRates(fineData)
    return responseData
}

const find=async(raise_days)=>{
    var responseData=await fineRatesRepository.find(raise_days)
    return responseData
}

module.exports={fineRates,find}