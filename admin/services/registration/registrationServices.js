const registrationRepository=require("../../repository/registration/registrationRepository")
const bcrypt=require("bcrypt")

const registration=async(body)=>
{
    const hashPassword=await bcrypt.hash(body.password,10)
    var adminData=
    {

        name:body.name,
        email:body.email,
        password:hashPassword,
        phonenumber:body.phonenumber
    }
    var responseData=await registrationRepository.registration(adminData)
    return responseData
}

module.exports={registration}