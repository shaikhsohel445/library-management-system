const express=require("express")
const router=express.Router()
const registrationController=require("../admin/controllers/registration/registrationController")
const loginController = require("../admin/controllers/login/loginController")
const {verifyAdminToken}=require("../middleware/tokenVerify")
const  profileController  = require("../admin/controllers/profile/profileController")
const bookController = require("../admin/controllers/books/bookController")
const addUserController = require("../admin/controllers/addUser/userController")
const userBookController= require("../admin/controllers/issueBook/userBookController")
const  fineRatesController = require("../admin/controllers/fineRates/fineRatesController")
const multer=require("multer")
const path=require("path")


//diskStorage is used to store files in the system
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"./public/bookImages")
    },
    filename:function(req,file,callback)
    {
        console.log(file)
        callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
      
    }
})
const upload=multer({storage:storage})


//admin
router.post("/registration",registrationController.registration)
router.post("/login",loginController.login)
router.put("/profile",verifyAdminToken,profileController.profileUpdate)

//books
router.post("/store",verifyAdminToken,upload.single("image"),bookController.store)
router.put("/update",verifyAdminToken,bookController.updateBooks)
router.get("/bookStock",verifyAdminToken,bookController.bookStock)

//adduser
router.post("/addUser",verifyAdminToken,addUserController.addUser)
router.get("/dropdown",verifyAdminToken,addUserController.userDataDropdown)


//issue Book
router.post("/userBook",verifyAdminToken,userBookController.userBookStore)
router.get("/bookHistoryTrack",verifyAdminToken,userBookController.bookHistoryTrack)
router.put("/bookSubmit",verifyAdminToken,userBookController.bookSubmit)

//fine calculate
router.post("/fineCalculate",verifyAdminToken,fineRatesController.fineRates)

//


module.exports=router