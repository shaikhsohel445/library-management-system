const bookRepository=require("../../repository/books/bookRepository")
const otpGenerator = require('otp-generator')
const store=async(req)=>
{
    var randomNumber=otpGenerator.generate(6, { digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false });
    var prefixData=`b-${randomNumber}`
    var bookData={
        name:req.body.name,
        author:req.body.author,
        book_id:prefixData,
        number_of_books:req.body.number_of_books,
        cost_of_each_book:req.body.cost_of_each_book,
        image:req.file.path,
        rack:req.body.rack,
        
        created_at: new Date(Date.now()),

    }

    var bookInfo=await bookRepository.store(bookData)
    return bookInfo
}

const find=async(condition)=>
{
    const responseData=await bookRepository.find(condition)
    return responseData
}

const updateBooks=async(body)=>
{
    const condition={book_id:body.book_id}
    const updateInfo={
        number_of_books:body.number_of_books,
        reason:body.reason,
        
    }
    const responseData=await bookRepository.updateBooks(condition,updateInfo)
    return responseData
}

const bookStock=async(body)=>
{
    var bookStockInfo={
        book_id:body.book_id
    }
    var responseData=await bookRepository.find(bookStockInfo)
    return responseData
}



module.exports={store,find,updateBooks,bookStock}