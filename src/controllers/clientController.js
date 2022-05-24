const { Client } = require('../models/index')

module.exports.get = async (req, res) => {
  try{
    const clients = await Client.findAll()
    res.json(clients)
  }
  catch(err){
    res.status(500).json({message : 'Error showing clients'})
  }
}

module.exports.post = async (req, res) => {
  const { body } = req
  try{
    const savedClient = await Client.create(body)
    res.status(201).json({ message : "Client created", savedClient})
  }
  catch(err){
    res.status(500).json({message: "Error creating client"})
  }
}

module.exports.put = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try{
    await Client.update(body, {where : { id : id }})
    res.json({ message: 'Client updated!'})
  }
  catch(err){
    res.status(500).json({message: "Error updating client"})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params

  try{
    await Client.destroy({ where : { id : id }})
    res.json({message: "Client deleted"})
  }
  catch(err){
    res.status(500).json({message: "Error deleting client"})
  }
}

module.exports.show = async (req, res) => {
  const { id } = req.params
  try{
    const client = await Client.findByPk(id)
    res.json({ client })
  }
  catch(err){
    res.status(500).json({message: "Error showing client"})
  }
}