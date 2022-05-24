const express = require("express")
const router = express.Router()

const productController = require('../controllers/productController')
const userExtractor = require("../middleware/userExtractor")

router.get('/api/products', userExtractor, productController.get)
router.post('/api/products', userExtractor, productController.post)
router.put('/api/products/:id', userExtractor, productController.put)
router.delete('/api/products/:id', userExtractor, productController.delete)
router.get('/api/products/:id', userExtractor, productController.show)

module.exports = router