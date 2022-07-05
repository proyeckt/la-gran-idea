const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = {
  validateToken
};

function validateToken(req,res,next){
  const token = req.headers['x-access-token'];

  jwt.verify(token,process.env.SECURE_KEY,function (err, decoded){
    if (err){
      return res.json({
        status:false,
        msg:"You don't have access to this resource. Invalid token."
      });    
    }
    else{
      req.userID = decoded;
      next();
    }
  });
}

module.exports = authenticate;