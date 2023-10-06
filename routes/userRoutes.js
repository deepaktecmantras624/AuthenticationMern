const express=require("express")
const router=express.Router()
const {registerUser,loginUser, userData, deleteUser, updateUser, userDataById, }=require("../controllers/userController")
const authMiddleware=require("../middleware/authMiddleware")


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/",authMiddleware,userData)
router.delete("/:id",authMiddleware, deleteUser)
router.put("/:id",authMiddleware, updateUser)
router.get("/:id",authMiddleware, userDataById)

module.exports=router