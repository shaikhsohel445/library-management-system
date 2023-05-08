const searchService = require("../../../user/services/search/searchService")

const search = async (req, res) => {
    const data = { book_id: req.query.search }
    const responseData = await searchService.search(data)
    if (responseData.status == true) {
        const Info = {
            number_of_books: responseData.data[0].number_of_books,
            rack: responseData.data[0].rack,
            cost_of_each_book: responseData.data[0].cost_of_each_book
        }
        res.send({ "status": "200", "message": "success", Info })
    }
    else {
        res.send({ "status": "200", "message": "Id not exists" })
    }

}
module.exports = { search }