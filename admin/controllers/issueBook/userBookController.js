const userBookService=require("../../services/issueBook/userBookService")
const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");
const userService = require("../../services/addUser/userService")
const bookService=require("../../services/books/bookService")

const userBookStore = async (req, res) => {
    try {
        const validations = [
            check("user_id").trim().notEmpty().withMessage(responseMessages.user.userIdRequired)
            .custom((value)=>{
                return userService.find({id:value}).then((userInfo)=>{
                    var userData=userInfo.status
                    if(!userData)
                    {
                        return Promise.reject(responseMessages.user.IdNotExists)
                    }
                })
            }),
            check("book_id").trim().notEmpty().withMessage(responseMessages.book.bookIdRequired)
            .custom((value) => {
                return bookService.find({ book_id: value }).then((bookInfo) => {
                    var bookData = bookInfo.status
                    if (!bookData) {
                        return Promise.reject(responseMessages.book.bookIdInvalid)
                    }
                })
            }),
            check("issue_date").trim().notEmpty().withMessage(responseMessages.user.issueDateRequired),
            check("expiry_date").trim().notEmpty().withMessage(responseMessages.user.expiryDateRequired)
        ]

        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await userBookService.userBookStore(req.body)
            res.send({ "status": "200", "message": "success" })
        }
        else {
            res.json(errors)
        }

    } catch (error) {
        console.log(error)
    }

}

const bookHistoryTrack=async(req,res)=>{
    var responseData=await userBookService.bookHistoryTrack()
    res.send({"status":"200","message":"success",responseData})
}

const bookSubmit=async(req,res)=>{
    try {
        const validations = [
            check("booking_id").trim().notEmpty().withMessage(responseMessages.user.userIdRequired)
            .custom((value)=>{
                return userBookService.find({booking_id:value}).then((userInfo)=>{
                    var userData=userInfo.status
                    if(!userData)
                    {
                        return Promise.reject(responseMessages.user.IdNotExists)
                    }
                })
            }),
            check("return_date").trim().notEmpty().withMessage(responseMessages.book.returnDateRequired)
            
        ]

        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            const condition={booking_id:req.body.booking_id}
            var responseData = await userBookService.bookSubmit(condition,req.body)
            var info={
                user_id:responseData.data[0].user_id,
                booking_id:responseData.data[0].booking_id,
                fine:responseData.data[0].fine
            }
            res.send({ "status": "200", "message": "success",info })
        }
        else {
            res.json(errors)
        }

    } catch (error) {
        console.log(error)
    }

}




module.exports={userBookStore,bookHistoryTrack,bookSubmit}
