const express = require('express')
const router = express.Router()
const USerController = require('../Controller/UserController')
const auth = require('../MiddleWare/Auth')

router.post('/add', USerController.adddata)

router.get('/getall',USerController.getall)

router.get('/getone',USerController.getone)

router.put('/update/:id', USerController.update)

router.get('/getonedata', USerController.getOneApi)

router.post('/login', USerController.login)

router.delete('/delete/:id', USerController.remove)


module.exports = router