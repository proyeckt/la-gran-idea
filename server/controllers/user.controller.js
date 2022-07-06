
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports.loginUser = async (req, res) => {

    const {email, password} = req.body;  
    
    const user = await User.findOne({email:email});

    if(user){
      const auth = await user.verifyPassword(password);
      if(auth){
        const token = jwt.sign(user._id.toString(),process.env.SECURE_KEY);

        if(!token){
          return res.json({
            auth:false,
            code: 2,
            msg:'La solicitud no ha podido ser confirmada. Intentalo más tarde.',
          });
        }
        return res.json({
          auth:true,
          code:0,
          msg:'Ingreso satisfactorio.',
          token:token
        });
      }
    }
    return res.json({
      auth:false,
      code: 1,
      msg:'Los datos de correo electrónico o contraseña son incorrectos.',
    });

}

module.exports.logoutUser = (req, res) => {
    
}

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

module.exports.getUsers = (req, res) => {
  User.find()
      .then(users => res.json({ users }))
      .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the users' }))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
      .then(user => res.json({ user }))
      .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the user' }));
}
