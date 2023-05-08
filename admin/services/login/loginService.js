const loginRepository=require("../../repository/login/loginRepository")

const login=async(body)=>
{
    var loginInfo=
    {
        email:body.email,
    }
    var loginData=await loginRepository.login(loginInfo)
    return loginData
}

const find=async(condition)=>
{
    var emailData=await loginRepository.login(condition)
    return emailData
}



module.exports={login,find}