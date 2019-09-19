const router = require('express').Router()
const auth = require('../verifyToken')

router.get('/allPosts', auth, (req, res) => {
    res.status(200).send("Private Data 😇")
})


module.exports = router;