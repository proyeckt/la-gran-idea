
const User = require('../models/user.model');


module.exports.createUser = (req, res) => {
    console.log(req.body.user);
    User.create(req.body.user)
        .then(newUser => res.json({ newUser }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the user' }));
}

module.exports.deleteAll = async (req, res) => {
    await User.deleteMany()
        .then(deleted => res.json({deleted}))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the user' }));
}
