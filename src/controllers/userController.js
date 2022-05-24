const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.get = async (req, res) => {
  try{
    const users = await User.findAll()
    res.json(users)
  }
  catch(err){
    console.log(err)
    res.status(500).json({message : 'Error showing users ' + err})
  }
}

module.exports.post = async (req, res) => {
  const { role, username, password, names, lastnames, phone } = req.body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = {
    role,
    username,
    names,
    lastnames,
    phone,
    passwordHash : passwordHash
  }

  try{
    const savedUser = await User.create(user)
    res.status(201).json({ message : "User created", savedUser})
  }
  catch(err){
    res.status(500).json({message: "Error creating user"})
  }
}

module.exports.put = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try{
    await User.update(body, {where : { id : id }})
    res.json({ message: 'User updated!'})
  }
  catch(err){
    res.status(500).json({message: "Error updating user"})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params

  try{
    await User.destroy({where : { id : id }})
    res.json({message: "User deleted"})
  }
  catch(err){
    res.status(500).json({message: "Error deleting user"})
  }
}

module.exports.show = async (req, res) => {
  const { id } = req.params
  try{
    const user = await User.findByPk(id)
    res.json({ user })
  }
  catch(err){
    res.status(500).json({message: "Error showing user"})
  }
}

module.exports.auth = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username : username } })

  const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
      res.status(401).json({
          message : "Authentication failed"
      })
      return
  }
  
  const userForToken = {
      id : user.id,
      username : user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.send({
      id : user.id,
      username : user.username,
      token
  })
}
