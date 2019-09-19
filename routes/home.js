let express = require('express')
let router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send("Express Js.. ")
})


module.exports = router;