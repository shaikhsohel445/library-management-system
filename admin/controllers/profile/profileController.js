const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");
const profileService = require("../../services/profile/profileService")



const profileUpdate = async (req, res) => {
    try {
        const validations =
            [
                check("adminId").trim().notEmpty().withMessage(responseMessages.profile.id)
                .custom((value)=>{
                    return profileService.find({id:value}).then((adminInfo)=>{
                        var adminData=adminInfo.status
                        if(!adminData)
                        {
                            return Promise.reject(responseMessages.profile.idNotExists)
                        }
                    })
                }),
                check("name").trim().notEmpty().withMessage(responseMessages.registration.nameRequired),
                check("email").trim().notEmpty().withMessage(responseMessages.registration.emailRequired).isEmail().withMessage(responseMessages.registration.emailInvalid),
                check("phonenumber").trim().notEmpty().withMessage(responseMessages.registration.phoneNumberRequired).matches(/^\d{10}$/).withMessage(responseMessages.registration.phoneNumberInvalid)
            ]

        /*Run the validation rules. */
        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await profileService.adminUpdate(req.body)
            if (responseData.status == true) {
                var adminInfo =
                {
                    name: responseData.data[0].name,
                    email: responseData.data[0].email,
                    phonenumber: responseData.data[0].phonenumber
                }
                res.send({ "status": "200", "message": "success", adminInfo })
            }
            else
            {
                res.send({ "status": "200", "message": "false",data:responseData.message})
            }

        }
        else {
            res.json(errors)
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = { profileUpdate }