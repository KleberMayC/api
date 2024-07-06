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

createProduct = (req, res) => {
  const product = req.body;
  if (Object.keys(product).length > 0) {
    //verificar o tamanho para enviar apenas se tiver algum parametro
    products.push(product); //se for valido vai enviar com o PUSH
    res.status(201).send(product);
  } else {
    res.status(406).send({
      success: "false",
      message: "Invalid product data",
      data: createProduct,
    }); //retorna o erro
  }
};

// Função para atualizar um produto
updateProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = findProductIndex(id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Produto não encontrado com o ID ${id}`,
    });
  }

  // Atualizar o produto existente com os novos dados
  const updatedProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;

  return res.status(200).json({
    success: true,
    message: "Produto atualizado com sucesso",
    data: updatedProduct,
  });
};

const findProductIndex = (id) => {
  return products.findIndex((product) => product.id === Number(id));
};

removeProduct = (req, res) => {
  const { id } = req.params;
  console.log("ID recebido:", id);
  const productIndex = findProductIndex(id);
  console.log("Índice do produto:", productIndex);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Produto não encontrado com o ID ${id}`,
    });
  }

  // Remover o produto do array
  const removedProduct = products.splice(productIndex, 1)[0];
  console.log("Produto removido:", removedProduct);

  return res.status(200).json({
    success: true,
    message: "Produto removido com sucesso",
    data: removedProduct,
  });
};

module.exports = {
  getProducts,
  getOneProducts,
  createProduct,
  updateProduct,
  removeProduct,
};
