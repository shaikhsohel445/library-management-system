const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");
const loginService = require("../../services/login/loginService")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    try {
        const validations =
            [
                check("email").trim().notEmpty().withMessage(responseMessages.registration.emailRequired).isEmail().withMessage(responseMessages.registration.emailInvalid)
                    .custom((value) => {
                        return loginService.find({ email: value }).then(async (emailInfo) => {
                            var emailData = emailInfo.status
                            if (!emailData) {
                                return Promise.reject(responseMessages.login.emailInvalid)
                            }
                            else {
                                const passwordMatch = await bcrypt.compare(req.body.password, emailInfo.data[0].password)
                                if (!passwordMatch) {
                                    return Promise.reject(responseMessages.login.passwordInvalid)
                                }
                            }
                        })
                    }),

                check("password").trim().notEmpty().withMessage(responseMessages.registration.password).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(responseMessages.registration.passwordInvalid)

            ]

        if (errors.isEmpty()) {
            var responseData = await loginService.login(req.body)
            const token = jwt.sign({ id_data: responseData.data[0].id,email_data: responseData.data[0].email }, process.env.adminsecretkey, { expiresIn: '24h' });
            res.send({ "status": "200", "message": "success", token: token })
        }
        else {
            res.json(errors)
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = { login }