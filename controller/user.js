const User = require('../models/user')



getUsers = (req, res) => {
    User.find().then(users => {
        res.status(200).send(users)
    })
}

module.exports = getUsers;