const { 
    validateToken,
 } = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/api/users/validate',validateToken);
}