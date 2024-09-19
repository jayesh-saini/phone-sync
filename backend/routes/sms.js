const express = require('express')
const router = express.Router()
const smsController = require('../controllers/smsController')

router.post('/', smsController.sendSMS)
router.get('/contacts', smsController.getContacts)
router.get('/conversation/:phoneNumber', smsController.getConversation)

module.exports = router