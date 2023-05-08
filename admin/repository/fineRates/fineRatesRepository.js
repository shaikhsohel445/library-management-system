const { dbConnection } = require("../../../db/database")

const fineRates = async (fineData) => {
    var fineInfo = await dbConnection('fine_rates')
        .insert(fineData)
        .returning("*")
    if (fineInfo.length > 0) {
        return { status: true, data: fineInfo }
    }
    else {
        return { status: false, message: "failed to insert data" }
    }
}

const find = async (raise_days) => {
    var fineInformation = await dbConnection('fine_rates')
    .select('fine_rates.from_day', 'fine_rates.to_day','fine_rates.cost')
    .where('fine_rates.from_day', '<=', raise_days)
    .andWhere('fine_rates.to_day', '>=', raise_days)
    console.log(fineInformation)
    if (fineInformation.length > 0) {
        return { status: true, data: fineInformation }
    }
    else {
        return { status: false, message: "failed to insert data" }
    }
}



module.exports = { fineRates, find }