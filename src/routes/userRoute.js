const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/api/v1/register", userController.createUser); //rota de registro
router.post("/api/v1/login", userController.loginUser); //rota de login
router.put("/api/v1/usuarios/:id", userController.updateUser); //atualiza o usuario
router.delete("/api/v1/usuarios/:id", userController.removeUser); //deleta 1 usuario

router.get("/api/v1/usuarios", userController.getUsers); // retornar todos os usuarios
router.get("/api/v1/usuarios/:id", userController.getOneUser); //retorna 1 usuario pelo id

module.exports = router;
