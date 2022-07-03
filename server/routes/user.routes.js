const { 
    createUser,
    deleteAll
 } = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/users/create',createUser);
    app.delete('/api/users/delete/all',deleteAll)
}