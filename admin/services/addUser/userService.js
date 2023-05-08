const userRepository=require("../../repository/addUser/userRepository")

const find=async(condition)=>
{
    const responseData=await userRepository.find(condition)
    return responseData
}

const addUser=async(body)=>
{
    var userInfo=
    {
        name:body.name,
        email:body.email,
        phonenumber:body.phonenumber,
        joining_date:body.joining_date,
        profile:body.profile,
        created_at: new Date(Date.now()),
    }
    var responseData=await userRepository.addUser(userInfo)
    return responseData
}


const userDataDropdown=async()=>
{
    var responseData=await userRepository.userDataDropdown()
    var totalUserInfo=responseData.data

    listingData = await totalUserInfo.map((item)=>{
      userInfo={
        id:item.id,
        name:item.name
      }
      return userInfo;
    })

       /* Using promise to wait till the address map completes. */
       responseData = await Promise.all(listingData);
       /* Using promise to wait till the address map completes. */
       return responseData
}

module.exports={find,addUser,userDataDropdown}