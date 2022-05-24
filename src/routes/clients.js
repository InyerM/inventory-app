const express = require("express")
const router = express.Router()

const clientController = require('../controllers/clientController')
const userExtractor = require("../middleware/userExtractor")

router.get('/api/clients', userExtractor, clientController.get)
router.post('/api/clients', userExtractor, clientController.post)
router.put('/api/clients/:id', userExtractor, clientController.put)
router.delete('/api/clients/:id', userExtractor, clientController.delete)
router.get('/api/clients/:id', userExtractor, clientController.show)

module.exports = router