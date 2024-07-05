const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");

router.get("/", productController.getProducts); // retornar todos os produtos
router.get("/:id", productController.getOneProducts); //retorna 1 produto pelo id
router.post("/", productController.createProduct); //cria produto

module.exports = router;
