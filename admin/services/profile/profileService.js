const profileRepository=require("../../repository/profile/profileRepository")



const adminUpdate = async (body) => {
   // console.log("update called with body:", body);
  
    var condition = {
      id: body.adminId,
    };
    var adminProfile = {
      name: body.name,
      email: body.email,
      phonenumber: body.phonenumber,
      updated_at: new Date(Date.now()),
    };
    var adminData = await profileRepository.adminUpdate(condition, adminProfile);
  
  //  console.log("update result:", adminData);
  
    return adminData;
  };

  const find=async(condition)=>
{
    var adminData=await profileRepository.find(condition)
    return adminData
}
  module.exports={adminUpdate,find}