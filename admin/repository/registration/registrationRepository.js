const { dbConnection } = require("../../../db/database");


const registration = async (adminData ) => {
  try {
    const adminInfo = await dbConnection("admin").insert(
      adminData,
      ["*"]
    );
    return { status: true, data: adminInfo };
  } catch (error) {
    console.log(error)
    throw error;
  }
};

  module.exports={registration}