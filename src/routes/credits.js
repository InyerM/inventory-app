const express = require("express")
const router = express.Router()

const creditController = require('../controllers/creditController')
const userExtractor = require("../middleware/userExtractor")

router.get('/api/credits', userExtractor, creditController.get)
router.post('/api/credits', userExtractor, creditController.post)
router.put('/api/credits/:id', userExtractor, creditController.put)
router.delete('/api/credits/:id', userExtractor, creditController.delete)
router.get('/api/credits/:id', userExtractor, creditController.show)
router.get('/api/allCredits', userExtractor, creditController.getAllCredits)

module.exports = router