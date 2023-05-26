const { productService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.findAll();

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};