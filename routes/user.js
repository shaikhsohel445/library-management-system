const express=require("express")
const searchController = require("../user/controller/search/searchController")
const bookHistoryController  = require("../user/controller/bookHistory/bookHistoryController")
const userFineController = require("../user/controller/fine/fineController")
const userLoginController = require("../user/controller/login/userLoginController")
const {verifyUserToken}=require("../middleware/tokenVerify")
const router=express.Router()

//user
router.get("/search",verifyUserToken,searchController.search)
router.get("/bookHistory",verifyUserToken,bookHistoryController.bookHistory)
router.get("/userFine",verifyUserToken,userFineController.userFine)
router.post("/login",userLoginController.login)

module.exports=router