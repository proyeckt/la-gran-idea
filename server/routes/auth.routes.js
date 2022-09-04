const Auth = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/api/auth/validate',Auth.validateToken);
}