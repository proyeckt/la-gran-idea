const { createUser } = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/users/create',createUser);
}