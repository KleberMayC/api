const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "seu_segredo_jwt";

getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(404).json({
        success: "false",
        message: `User not found with id ${id}`,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

createUser = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,

        email,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,

        email,
        username,
        password: hashedPassword,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: `User not found with id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const removedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    if (!removedUser) {
      return res.status(404).json({
        success: false,
        message: `User not found with id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "User removed successfully",
      data: removedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  loginUser,
  createUser,
  updateUser,
  removeUser,
};
