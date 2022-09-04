const UserVerification = require('../models/userVerification.model');

//Email handler
const nodemailer = require('nodemailer');

//Unique string
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

require('dotenv').config();

//nodemailer stuff 
const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  //service:"gmail",
  auth:{
    "user":process.env.AUTH_EMAIL,
    "pass":process.env.AUTH_PW
  }
});

//testing success
transporter.verify().then(()=> console.log("Ready for send emails."));

module.exports.sendVerificationEmail = async ({_id,email},res) => {

  const url = "http://localhost:3000/auth/verify/";
  const uniqueString = uuidv4() + _id;
  

  const mailOptions={
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your account ✔",
    html: `<p>Verify your email address to complete the signup and to be able to login into your account.
          </p><p>This link <b>expires in 6 hours</b>.<p>Go <a href=${url+_id+uniqueString}> here</a> 
          to proceed.</p>`
  };

  bcrypt.hash(uniqueString, 10)
        .then(hashedUniqueString => {
            const newVerification = new UserVerification({
              userId:_id,
              uniqueString:hashedUniqueString,
              created:Date.now(),
              expiresIn:Date.now() + 21600000, //six hours in ms
            });

            newVerification
              .save()
              .then(async ()=> {
                // send mail with defined transport object
                let info = await transporter.sendMail(mailOptions)
                  .then(() => res.json({status:true, code: 5, msg:'Verification email sent successfully.'}))
                  .catch((err) => res.status({status: false,code: 4,msg:"There's an issue sending the verification email."}))

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              }).catch((err) => res.status({status: false,code: 4,msg:"There's an issue creating the verification email."}));
        })
        .catch((err) => {
          res.status({
            status: false,
            code: 4,
            msg:"There's an issue generating the verification email."
          });
        });
}

module.exports.verify = (req, res) => {
  console.log(req.params);
  let {userId,uniqueString} = req.params;
  UserVerification.find({userId})
    .then((result) => {
      if(result.length >0 ){
        //user verification exists, so we proceed
        const {expiresAt} = result[0].expiresIn;
        const {hashedUniqueString} = result[0].uniqueString;

        //Checking for expired unique string
        if(expiresAt < Date.now()){
          //Record has expired, so we delete it
          UserVerification.deleteOne({userId})
            .then(result => {
              User.deleteOne({userId}).then(()=> {
                return res.json({status:false, code:6, msg: "Link has expired. Please sign up again."});
              })
              .catch(err =>{
                console.log(err)
                return res.json({status:false, code:5, msg: "An error occurred when deleting user from database."});
              })
            })
            .catch((err)=>{
              console.log(err);
              return res.json({status:false, code:3, msg: "An error occurred when deleting expired user verification record."});
            })
        }
        else{
          //Valid record exists, so we validate the user string
          //First compare the hashed unique string
          bcrypt.compare(uniqueString,hashedUniqueString)
            .then(result =>{
              if(result){
                //strings match
                User.updateOne({_id:userId},{verified:true})
                .then(()=>{
                  UserVerification.deleteOne({userId})
                    .then(()=>{
                      let msg = 'User verified successfully. Now you can login without any issue'.
                      console.log(msg);
                      return res.json({status:true, code:0, msg: msg});
                    })
                    .catch(err =>{
                      console.log(err);
                      return res.json({status:false, code:10, msg: "An error occurred when deleting the verified record."});
                    });

                })
                .catch(err =>{
                  console.log(err);
                  return res.json({status:false, code:9, msg: "An error occurred while updating the verified user status."});
                });
              }else{
                //existing record but incorrect verification details passed
                return res.json({status:false, code:8, msg: "Invalid verification details passed. Check your inbox."});
              }
            })
            .catch(err => {
              console.log(err);
              return res.json({status:false, code:7, msg: "An error occurred when comparing unique strings."});
            });
        }

        return 
      }
      else return res.json({status:false, code:2, msg: "Account to verify doesn't exist or has been verified already. Please signup or login."});
    })
    .catch((err) => res.json({status:false, code:1, msg: "An error occurred while checking "}));
    
}