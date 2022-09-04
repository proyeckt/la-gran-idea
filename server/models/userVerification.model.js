const { Schema, model } = require('mongoose');

const UserVerificationSchema = new Schema({
  userId: String,
  uniqueString: String,
  createdAt:Date,
  expiresIn:Date
}, { timestamps: true, versionKey: false });

const UserVerification = model('UserVerification', UserVerificationSchema);

module.exports = UserVerification;