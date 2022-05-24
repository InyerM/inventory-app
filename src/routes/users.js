const express = require("express")
const router = express.Router()

const userController = require('../controllers/userController')
const userExtractor = require("../middleware/userExtractor")

router.get('/api/users', userExtractor, userController.get)
router.post('/api/users', userController.post)
router.put('/api/users/:id', userExtractor, userController.put)
router.delete('/api/users/:id', userExtractor, userController.delete)
router.get('/api/users/:id', userExtractor, userController.show)
router.post('/api/auth/login', userController.auth)

module.exports = router