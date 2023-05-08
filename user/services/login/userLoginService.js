//const userLoginRepository=require("../../../user/repository/login/userLoginRepository")
const userRepository=require("../../../admin/repository/addUser/userRepository")
const login=async(body)=>{
    var loginInfo={
        email:body.email,
        name:body.name
    }
    var responseData=await userRepository.find(loginInfo)
    return responseData
}
module.exports={login}