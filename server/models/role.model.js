const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  name: String, 
},{
  versionKey:false
}
);

const Role = model('Role',RoleSchema);

module.exports = Role;
