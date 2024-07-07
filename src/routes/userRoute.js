const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/register", userController.createUser); //cria produto
router.post("/login", userController.loginUser); //cria produto
router.put("/usuarios/:id", userController.updateUser); //atualiza produto
router.delete("/usuarios/:id", userController.removeUser); //deleta produto

router.get("/usuarios", userController.getUsers); // retornar todos os produtos
router.get("/usuarios/:id", userController.getOneUser); //retorna 1 produto pelo id

module.exports = router;
