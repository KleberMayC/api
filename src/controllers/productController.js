const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

getOneProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      return res.status(404).json({
        success: "false",
        message: `Product not found with id ${id}`,
      });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

createProduct = async (req, res) => {
  try {
    const product = req.body;
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
    if (Object.keys(product).length > 0) {
      const newProduct = await prisma.product.create({
        data: product,
      });
      res.status(201).json(newProduct);
    } else {
      res.status(406).json({
        success: "false",
        message: "Invalid product data",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const removedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    if (!removedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: removedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getOneProducts,
  createProduct,
  updateProduct,
  removeProduct,
};
