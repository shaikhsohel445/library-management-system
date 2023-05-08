const responseMessages={
    registration:{
        nameRequired: "name is required",
        passwordRequired: "password is required",
        passwordInvalid:"password should be in the combination of contains at least one digit,at least one lowercase letter,at least one uppercase letter,at least one special character,at least 8 characters long",
        emailRequired:"email required",
        emailInvalid:"email Invalid",
        phoneNumberRequired:"phone number required",
        phoneNumberInvalid:"phone number invalid"

    },
    login:{
        emailInvalid:"email Invalid",
        passwordInvalid:"password Invalid"
    },
    profile:{
        id:"id required",
        idNotExists:"Id not exists"
    },
    book:{
        nameRequired:"book name required",
        number:"must be an number",
        authorRequired:"author name required",
        noOfBooksRequired:"number of books required",
        eachBookCostRequired:"each book cost is required",
        rackRequired:"rack name is required",
        bookIdRequired:"book Id required",
        bookIdInvalid:"book Id Invalid",
        reasonRequired:"reason Required",
        bookIdAlreadyExists:"book Id already exists",
        returnDateRequired:"return Date Required",
        imageRequired:"image required"
    },
    user:{
        nameRequired: "name is required",
        emailRequired:"email required",
        emailInvalid:"email Invalid",
        phoneNumberRequired:"phone number required",
        phoneNumberExist:"phone Number already Exist",
        phoneNumberInvalid:"phone number invalid",
        joiningDateRequired:"joining date required",
        profileRequired:"profile description is required",
        emailExists:"email already exists",
        userIdRequired:"user Id Required",
        IdNotExists:"Id not exists",
        issueDateRequired:"book issue date required",
        expiryDateRequired:"book expiry date required",
        joiningDateInvalid:"joining Date Invalid"
    },
    fine:{
        fromDayRequired:"from day required",
        toDayRequired:"to day required",
        costRequired:"cost required"
    }

}
module.exports={responseMessages}