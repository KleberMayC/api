const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");


router.get("/api/v1/products", productController.getProducts); // retornar todos os produtos
router.get("/api/v1/products/:id", productController.getOneProducts); //retorna 1 produto pelo id
router.post("/api/v1/products", productController.createProduct); //cria produto
router.put("/api/v1/products/:id", productController.updateProduct); //atualiza produto
router.delete("/api/v1/products/:id", productController.removeProduct); //deleta produto

module.exports = router;
