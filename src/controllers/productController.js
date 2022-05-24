const { Product } = require('../models/index')

module.exports.get = async (req, res) => {
  try{
    const products = await Product.findAll()
    res.json(products)
  }
  catch(err){
    res.status(500).json({message : 'Error showing products'})
  }
}

module.exports.post = async (req, res) => {
  const { body } = req

  try{
    const savedProduct = await Product.create(body)
    res.status(201).json({ message : "Product created", savedProduct})
  }
  catch(err){
    res.status(500).json({message: "Error creating product"})
  }
}

module.exports.put = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try{
    await Product.update(body, {where : { id : id }})
    res.json({ message: 'Product updated!'})
  }
  catch(err){
    res.status(500).json({message: "Error updating product"})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params

  try{
    await Product.destroy({ where : { id : id }})
    res.json({message: "Product deleted"})
  }
  catch(err){
    res.status(500).json({message: "Error deleting product"})
  }
}

module.exports.show = async (req, res) => {
  const { id } = req.params
  try{
    const product = await Product.findByPk(id)
    res.json({ product })
  }
  catch(err){
    res.status(500).json({message: "Error showing product"})
  }
}