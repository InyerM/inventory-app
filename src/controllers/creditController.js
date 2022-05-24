const { Credit } = require('../models/index')
const { Product } = require('../models/index')
const { Purchase } = require('../models/index')
const { Client } = require('../models/index')

module.exports.get = async (req, res) => {
  try{
    const credits = await Credit.findAll()
    res.json(credits)
  }
  catch(err){
    res.status(500).json({message : 'Error showing credits'})
  }
}

module.exports.post = async (req, res) => {
  const { body } = req

  try{
    const savedCredit = await Credit.create(body)
    res.status(201).json({ message : "Credit created", savedCredit})
  }
  catch(err){
    res.status(500).json({message: "Error creating credit"})
  }
}

module.exports.put = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try{
    await Credit.update(body, {where : { id : id }})
    res.json({ message: 'Credit updated!'})
  }
  catch(err){
    res.status(500).json({message: "Error updating credit"})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params

  try{
    await Credit.destroy({ where : { id : id }})
    res.json({message: "Credit deleted"})
  }
  catch(err){
    res.status(500).json({message: "Error deleting credit"})
  }
}

module.exports.show = async (req, res) => {
  const { id } = req.params
  try{
    const credit = await Credit.findByPk(id)
    res.json({ credit })
  }
  catch(err){
    res.status(500).json({message: "Error showing credit"})
  }
}

module.exports.getAllCredits = async (req, res) => {
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
        },
        {
          model : Credit,
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