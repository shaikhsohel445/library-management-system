const userBookRepository=require("../../repository/issueBook/userBookRepository")
const moment=require("moment")
const fineRatesService = require("../../services/fineRates/fineRatesService")
const otpGenerator = require('otp-generator')

const userBookStore=async(body)=>
{
    var randomNumber=otpGenerator.generate(6, { digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false });
    var userBookData={
        user_id:body.user_id,
        booking_id:randomNumber,
        book_id:body.book_id,
        issue_date:body.issue_date,
        expiry_date:body.expiry_date,
        created_at:new Date(Date.now())
    }
    var responseData=await userBookRepository.userBookStore(userBookData)
    return responseData
}

const bookHistoryTrack=async()=>{
    var responseData=await userBookRepository.bookHistoryTrack()
    var totalDetails=responseData.data
    var listingData=await totalDetails.map((item)=>{
        var obj={
            id:item.id,
            name:item.name,
            book_taken_date:item.issue_date?moment(item.issue_date).format('YYYY-MM-DD') : '',
            book_return_date:item.return_date?moment(item.return_date).format('YYYY-MM-DD') : '',
            booking_id:item.booking_id
        }
        return obj
    })

       /* Using promise to wait till the address map completes. */
       responseData = await Promise.all(listingData);
       /* Using promise to wait till the address map completes. */
       return responseData
}

const bookSubmit=async(condition,body)=>{
    var bookData={
        return_date:body.return_date,
        updated_at:new Date(Date.now())
    }
    var responseData=await userBookRepository.bookSubmit(condition,bookData)
    var return_date=moment(responseData.data[0].return_date)
    var expiry_date=moment(responseData.data[0].expiry_date)
  var raise_days=return_date.diff(expiry_date,'days')
    console.log(raise_days)

    const costInfo=await datesBetween(raise_days)
    if(costInfo.status==true){

    console.log(costInfo.data[0].cost)
    const constData={fine:costInfo.data[0].cost}
    var responseData=await userBookRepository.bookSubmit(condition,constData)
    }
    else
    {
        const constData={fine:0}
        var responseData=await userBookRepository.bookSubmit(condition,constData)
    }


    return responseData
}

const datesBetween=async(raise_days)=>
{
    var responseData=await fineRatesService.find(raise_days)
    return responseData
}


const find=async(condition)=>{
    var responseData=await userBookRepository.find(condition)
    return responseData
}

module.exports={userBookStore,bookHistoryTrack,bookSubmit,find}