const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");
const registrationService = require("../../services/registration/registrationServices")



const registration = async (req, res) => {
    try {
        const validations =
            [
                check("name").trim().notEmpty().withMessage(responseMessages.registration.nameRequired),
                check("email").trim().notEmpty().withMessage(responseMessages.registration.emailRequired).isEmail().withMessage(responseMessages.registration.emailInvalid),
                check("password").trim().notEmpty().withMessage(responseMessages.registration.passwordRequired).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(responseMessages.registration.passwordInvalid),
                check("phonenumber").trim().notEmpty().withMessage(responseMessages.registration.phoneNumberRequired) .matches(/^\d{10}$/).withMessage(responseMessages.registration.phoneNumberInvalid)
            ]

        /*Run the validation rules. */
        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await registrationService.registration(req.body)
            var adminData=
            {
                name:responseData.data[0].name,
                email:responseData.data[0].email
            }
            res.send({ "status": "200", "message": "success",adminData })

        }
        else {
            res.json(errors)
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = { registration }