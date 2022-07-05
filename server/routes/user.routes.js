const { 
    loginUser,
    logoutUser,
    createUser,
    deleteAll,
 } = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/users/login',loginUser);
    app.post('/api/users/logout',logoutUser);
    app.post('/api/users/create',createUser);
    app.delete('/api/users/delete/all',deleteAll)
}