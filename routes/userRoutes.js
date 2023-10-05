const express=require("express")
const router=express.Router()
const {registerUser,loginUser, userData, deleteUser, updateUser, }=require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/register",userData)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)

module.exports=router