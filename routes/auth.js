const router = require('express').Router()
const bcrypt = require('bcrypt');

//importing model

const User = require('../models/user')

router.get('/allUsers', (req, res) => {
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



module.exports = router;