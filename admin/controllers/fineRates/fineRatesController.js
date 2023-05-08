const fineRatesService = require("../../services/fineRates/fineRatesService")
const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");

const fineRates = async (req, res) => {
    try {
        const validations = [
            check('from_day').trim().notEmpty().withMessage(responseMessages.fine.fromDayRequired),
            check('to_day').trim().notEmpty().withMessage(responseMessages.fine.toDayRequired),
            check('cost').trim().notEmpty().withMessage(responseMessages.fine.costRequired)
        ]
        /*Run the validation rules. */
        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await fineRatesService.fineRates(req.body)
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
module.exports = { fineRates }