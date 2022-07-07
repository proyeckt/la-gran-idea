const Auth = require('../controllers/auth.controller');

const Joboffer = require('../controllers/joboffer.controller');

module.exports = (app) => {
    app.get('/api/joboffers',Auth.validateToken,Joboffer.getJoboffers);
    app.post('/api/joboffers/create',[Auth.validateToken,Auth.isCompany],Joboffer.createJoboffer);
    app.get('/api/job/:id',Auth.validateToken,Joboffer.getJobById);
    app.delete('/api/joboffer/delete/:id',[Auth.validateToken,Auth.isCompany],Joboffer.deleteJob);
    app.put('/api/joboffer/edit/:id',[Auth.validateToken,Auth.isCompany],Joboffer.updateJob);
    app.put('/api/joboffer/add-visits/:id',Auth.validateToken,Joboffer.addVisitsCounter);
}