const express = require("express")
const router = express.Router()

const purchaseController = require('../controllers/purchaseController')
const userExtractor = require("../middleware/userExtractor")

router.get('/api/purchases', userExtractor, purchaseController.get)
router.post('/api/purchases', userExtractor, purchaseController.post)
router.put('/api/purchases/:id', userExtractor, purchaseController.put)
router.delete('/api/purchases/:id', userExtractor, purchaseController.delete)
router.get('/api/purchases/:id', userExtractor, purchaseController.show)
router.get('/api/allPurchases', userExtractor, purchaseController.getFullPurchases)
router.get('/api/showPurchase/:id', userExtractor, purchaseController.showFullPurchase)

module.exports = router