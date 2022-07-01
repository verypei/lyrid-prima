const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/Authorization");
const productControllers = require("../controllers/productController.js");


router.get("/",authentication,productControllers.getProducts);

router.get("/:id",authentication,productControllers.getProductById);

router.post("/",authentication,productControllers.addProduct);

router.put("/:id",authentication,authorization,productControllers.updateProduct);

router.delete("/:id",authentication,authorization,productControllers.deleteProduct);

module.exports=router;