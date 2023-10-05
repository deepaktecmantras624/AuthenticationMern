const express=require("express")
const router=express.Router()
const {registerUser,loginUser, userData, deleteUser, }=require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/register",userData)
router.delete("/:id", deleteUser)

module.exports=router