const {dbConnection}=require("../../../db/database")

const adminUpdate=async(condition,adminProfile)=>
{
   
    var adminInfo=await dbConnection("admin")
    .where(condition)
    .update(adminProfile)
    .returning('*')
    if (adminInfo.length>0) {
        return { status: true, data: adminInfo }
      } else {
        return {
          status: false,
          message: "Id not exists",
          error: ''
        }
      }   
}


const find = async (condition) => {
    const adminInfo = await dbConnection("admin")
    .where(condition);
    if (adminInfo.length > 0) {
        return { status: true, data: adminInfo[0] };
    } else {
        return { status: false, message: "failed to find id" };
    }
};

module.exports={adminUpdate,find}