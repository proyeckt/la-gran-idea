
const User = require('../models/user.model');


module.exports.createUser = (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then(newUser => res.json({ newUser }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the user' }));
}