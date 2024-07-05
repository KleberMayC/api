const products = [
  { id: 1, name: "Produto 1" },
  { id: 2, name: "Produto 2" },
  { id: 3, name: "Produto 3" },
];

getProducts = (req, res) => {
  //lista todos os produtos
  res.status(200).json(products);
};
getOneProducts = (req, res) => {
  // lista 1 produto
  let id = req.params.id;
  const product = products.find((item) => item.id === Number(id));
  // pega a mesma paridade para renderizar, usado o Number(id) pois está solicitando apenas numero
  if (product) {
    res.status(200).send(product);
    // caso encontre o produto retornar o produto
  } else {
    res.status(404).send({
      success: "false",
      message: `Product not found with id ${id}`,
    });
  }
  // caso não encontre o produto retornar o erro
};

module.exports = {
  getProducts,
  getOneProducts,
};
