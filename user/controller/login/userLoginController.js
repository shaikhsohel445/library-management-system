const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");
const userService = require("../../../admin/services/addUser/userService")
const userLoginService = require("../../../user/services/login/userLoginService")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    try {
        const validations =
            [
                check("name").trim(). notEmpty().withMessage(responseMessages.registration.nameRequired),
                check("email").trim().notEmpty().withMessage(responseMessages.registration.emailRequired).isEmail().withMessage(responseMessages.registration.emailInvalid)
                    .custom((value) => {
                        return userService.find({ email: value }).then(async (emailInfo) => {
                            var emailData = emailInfo.status
                            if (!emailData) {
                                return Promise.reject(responseMessages.login.emailInvalid)
                            }
                        })
                    }),
            ]

        /*Run the validation rules. */
        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await userLoginService.login(req.body)
            if(responseData.status==true){
            const token = jwt.sign({ id: responseData.data[0].id, email_id: responseData.data[0].email }, process.env.userSecretkey, { expiresIn: '24h' });
            res.send({ "status": "200", "message": "success", token: token })
            }
            else
            {
                res.send({"status":"400","message":"cannot fetch above data please enter proper details"})
            }
        }
        else {
            res.json(errors)
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = { login }