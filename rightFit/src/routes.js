const express = require('express')
const{create, login, read, deleted, edit} = require('./Controllers/user-controller')
const router = express.Router()
const authHeaders = require('./middlewares/auth')

router.post('/user',create)
router.post('/login',login)
router.get('/read',authHeaders,read)
router.delete('/delete',authHeaders,deleted)
router.put('/edit',authHeaders,edit)

module.exports = router