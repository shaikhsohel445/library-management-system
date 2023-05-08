const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");
const bookService = require("../../services/books/bookService")



const store = async (req, res) => {
    try {
        const validations =
            [
                check("name").trim().notEmpty().withMessage(responseMessages.book.nameRequired),
                check("author").trim().notEmpty().withMessage(responseMessages.book.authorRequired),
                //check("image").trim().notEmpty().withMessage(responseMessages.book.imageRequired),
                check("number_of_books").trim().notEmpty().withMessage(responseMessages.book.noOfBooksRequired).matches('[0-9]').withMessage(responseMessages.book.number),
                check("cost_of_each_book").trim().notEmpty().withMessage(responseMessages.book.eachBookCostRequired).matches('[0-9]').withMessage(responseMessages.book.number),
                check("rack").trim().notEmpty().withMessage(responseMessages.book.rackRequired),
            ]

        /*Run the validation rules. */
        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await bookService.store(req)
            if (responseData.status == true) {
                res.send({ "status": "200", "message": "success" })
            }

        }
        else {
            res.json(errors)
        }
    } catch (error) {
        console.log(error)
    }
}


const updateBooks = async (req, res) => {
    const validations = [
        check("book_id").trim().notEmpty().withMessage(responseMessages.book.bookIdRequired)
            .custom((value) => {
                return bookService.find({ book_id: value }).then((bookInfo) => {
                    var bookData = bookInfo.status
                    if (!bookData) {
                        return Promise.reject(responseMessages.book.bookIdInvalid)
                    }
                })
            }),
        check("number_of_books").trim().notEmpty().withMessage(responseMessages.book.noOfBooksRequired).matches('[0-9]').withMessage(responseMessages.book.number),
        check("reason").trim().notEmpty().withMessage(responseMessages.book.reasonRequired)

    ]
    /*Run the validation rules. */
    for (let validation of validations) {
        var result = await validation.run(req);
        if (result.errors.length) break;
    }
    var errors = validationResult(req);
    if (errors.isEmpty()) {
        var responseData = await bookService.updateBooks(req.body)
        if (responseData.status == true) {
            res.send({ "status": "200", "message": "success" })
        }
    }
    else {
        res.send(errors)
    }
}

const bookStock = async (req, res) => {
    const validations = [
        check("book_id").trim().notEmpty().withMessage(responseMessages.book.bookIdRequired)
            .custom((value) => {
                return bookService.find({ book_id: value }).then((bookInfo) => {
                    var bookData = bookInfo.status
                    if (!bookData) {
                        return Promise.reject(responseMessages.book.bookIdInvalid)
                    }
                })
            })

    ]
    /*Run the validation rules. */
    for (let validation of validations) {
        var result = await validation.run(req);
        if (result.errors.length) break;
    }
    var errors = validationResult(req);
    if (errors.isEmpty()) {
        var responseData = await bookService.bookStock(req.body)
        if (responseData.status == true) {
            var bookStockInfo={
                book_id:responseData.data[0].book_id,
                book_name:responseData.data[0].name,
                number_of_books:responseData.data[0].number_of_books
            }
            res.send({ "status": "200", "message": "success",bookStockInfo })
        }
    }
    else {
        res.send(errors)
    }
}




module.exports = { store, updateBooks,bookStock, }