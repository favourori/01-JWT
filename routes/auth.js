const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../verifyToken')

//importing model

const User = require('../models/user')

router.get('/allUsers', auth, (req, res) => {
    User.find().then(users => {
        res.status(200).send(users)
    })
})


router.post('/register', async (req, res) => {

    //Hash password
    let salt = await bcrypt.genSalt(10)
    let hashedPssword = await bcrypt.hash(req.body.password, salt)

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPssword
    })

    try {
        //check if a user exists
        let userExists = await User.findOne({ email: req.body.email })
        if (userExists) return res.status(400).send("A user with this email already exists")

        let newUser = await user.save()
        res.status(200).send({
            success: true,
            data: newUser
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }
})


router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send("Email is invalid")

        //Else if the email is valid, let's check for the password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        //console.log(validPassword)
        if (!validPassword) return res.status(400).send("Password is invalid")


        //Username & password are valid..
        //Create & Assign Token

        const token = jwt.sign({ user: user }, process.env.JWT_SECRET)
        res.header("auth-token", token).status(200).send(token)


    } catch (err) {
        res.status(400).send(err.message)
    }
})


module.exports = router;