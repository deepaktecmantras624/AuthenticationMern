const express=require("express")
const { addProduct, productData, deleteProduct, updateProduct, productDataById } = require("../controllers/productController")
const router=express.Router()



router.post("/",addProduct)
router.get("/", productData)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)
router.get("/:id", productDataById)

module.exports=router