const express=require("express")
const router=express.Router()
const {registerUser,loginUser, userData, deleteUser, updateUser, userDataById, }=require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/register",userData)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)
router.get("/register/:id", userDataById)

module.exports=router