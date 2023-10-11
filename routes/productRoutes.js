const express=require("express")
const { addProduct, productData, deleteProduct, updateProduct, productDataById } = require("../controllers/productController")
const authMiddleware = require("../middleware/authMiddleware")
const router=express.Router()



router.post("/",authMiddleware,addProduct)
router.get("/",authMiddleware, productData)
router.delete("/:id",authMiddleware, deleteProduct)
router.put("/:id",authMiddleware, updateProduct)
router.get("/:id",authMiddleware, productDataById)

module.exports=router