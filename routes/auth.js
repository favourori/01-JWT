const router = require('express').Router()
const auth = require('../verifyToken')

//importing model

const User = require('../models/user')

//controller

const { getUsers, registerUser, userLogin } = require('../controllers/user')

router.get('/allUsers', auth, getUsers)

router.post('/register', registerUser)


router.post('/login', userLogin)


module.exports = router;