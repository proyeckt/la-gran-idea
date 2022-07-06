const User = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/users/login',User.loginUser);
    app.post('/api/users/logout',User.logoutUser);
    app.post('/api/users/create',User.createUser);
    app.delete('/api/users/delete/all',User.deleteAll);
    app.get('/api/users',User.getUsers);
    app.get('/api/users/:id',User.getUserById);
}