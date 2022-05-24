const { Purchase } = require('../models/index')
const { Product } = require('../models/index')
const { Client } = require('../models/index')

module.exports.get = async (req, res) => {
  try{
    const purchases = await Purchase.findAll()
    res.json(purchases)
  }
  catch(err){
    res.status(500).json({message : 'Error showing purchases'})
  }
}

module.exports.post = async (req, res) => {
  const { body } = req

  try{
    const savedPurchase = await Purchase.create(body)
    res.status(201).json({ message : "Purchase created", savedPurchase})
  }
  catch(err){
    res.status(500).json({message: "Error creating purchases"})
  }
}

module.exports.put = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try{
    await Purchase.update(body, {where : { id : id }})
    res.json({ message: 'Purchase updated!'})
  }
  catch(err){
    res.status(500).json({message: "Error updating purchases"})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params

  try{
    await Purchase.destroy({ where : { id : id }})
    res.json({message: "Purchase deleted"})
  }
  catch(err){
    res.status(500).json({message: "Error deleting purchases"})
  }
}

module.exports.show = async (req, res) => {
  const { id } = req.params
  try{
    const purchases = await Purchase.findByPk(id)
    res.json({ purchases })
  }
  catch(err){
    res.status(500).json({message: "Error showing purchases"})
  }
}

module.exports.getFullPurchases = async (req, res) => {
  try{
    const purchases = await Purchase.findAll({
      include : [
        {
          model : Product,
          required : true
        },
        {
          model : Client,
          required : true
        }
      ]
    })
    res.json(purchases)
  }
  catch(err){
    res.status(500).json({message : 'Error showing purchases'})
  }
}

module.exports.showFullPurchase = async (req, res) => {
  try{
    const purchase = await Purchase.findOne({
      include : [
        {
          model : Product,
          required : true
        },
        {
          model : Client,
          required : true
        }
      ]
    })
    res.json(purchase)
  }
  catch(err){
    res.status(500).json({message : 'Error showing purchase'})
  }
}