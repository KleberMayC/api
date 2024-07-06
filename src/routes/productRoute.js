const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
const upload = require("./../config/multer");

router.post(
  "/products/images",
  upload.single("image"),
  productController.createProduct
);
router.get("/", productController.getProducts); // retornar todos os produtos
router.get("/:id", productController.getOneProducts); //retorna 1 produto pelo id
router.post("/", productController.createProduct); //cria produto
router.put("/:id", productController.updateProduct); //atualiza produto
router.delete("/:id", productController.removeProduct); //deleta produto

module.exports = router;
