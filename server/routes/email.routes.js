const Email = require('../controllers/email.controller');

module.exports = (app) => {
    app.post('/api/email/verify/:userId/:uniqueString',Email.verify);
}