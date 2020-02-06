const express = require('express')
const messagesControllers = require('../app/controllers/messagesControllers')

const {authenticationUser} = require('../app/middlewares/authentication')

const router = express.Router()

router.get('/messages', authenticationUser, messagesControllers.list)
router.post('/messages', authenticationUser, messagesControllers.create)
router.get('/messages/:id', authenticationUser, messagesControllers.show)
router.put('/messages/:id', authenticationUser, messagesControllers.update)
router.delete('/messages/:id', authenticationUser, messagesControllers.destroy)

module.exports = router