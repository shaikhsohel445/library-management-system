const userService = require("../../services/addUser/userService")
const { check, validationResult } = require('express-validator');
const { responseMessages } = require("../../../errors/responseMessages");

const addUser = async (req, res) => {
    try {
        const validations = [
            check("name").trim().notEmpty().withMessage(responseMessages.user.nameRequired),
            check("email").trim().notEmpty().withMessage(responseMessages.user.emailRequired).isEmail().withMessage(responseMessages.registration.emailInvalid)
                .custom((value) => {
                    return userService.find({ email: value }).then((emailInfo) => {
                        var emailData = emailInfo.status
                        if (emailData) {
                            return Promise.reject(responseMessages.user.emailExists)
                        }
                    })
                }),
            check("phonenumber").trim().notEmpty().withMessage(responseMessages.registration.phoneNumberRequired).matches(/^\d{10}$/).withMessage(responseMessages.registration.phoneNumberInvalid)
            .custom((value)=>{
                return userService.find({phonenumber:value}).then((numberInfo)=>{
                    var phonenumberData=numberInfo.status
                    if(phonenumberData)
                    {
                        return Promise.reject(responseMessages.user.phoneNumberExist)
                    }
                })
            }),
            check("joining_date").trim().notEmpty().withMessage(responseMessages.user.joiningDate).isDate().withMessage(responseMessages.user.joiningDateInvalid),
            check("profile").trim().notEmpty().withMessage(responseMessages.user.profileRequired)
        ]

        for (let validation of validations) {
            var result = await validation.run(req);
            if (result.errors.length) break;
        }
        var errors = validationResult(req);
        if (errors.isEmpty()) {
            var responseData = await userService.addUser(req.body)
            res.send({ "status": "200", "message": "success" })
        }
        else {
            res.json(errors)
        }

    } catch (error) {
        console.log(error)
    }

}

const userDataDropdown=async(req,res)=>
{
    var responseData=await userService.userDataDropdown()
    res.send({"status":"200","message":"success",data:responseData})
}



module.exports = { addUser,userDataDropdown }