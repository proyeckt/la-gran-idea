const {validateToken} = require('../controllers/auth.controller');

const Joboffer = require('../controllers/joboffer.controller');

module.exports = (app) => {
    app.get('/api/joboffers',validateToken,Joboffer.getJoboffers);
    app.post('/api/joboffers/create',validateToken,Joboffer.createJoboffer);
    app.get('/api/job/:id',validateToken,Joboffer.getJobById);
    app.delete('/api/joboffer/delete/:id',validateToken,Joboffer.deleteJob);
    app.put('/api/joboffer/edit/:id',validateToken,Joboffer.updateJob);
    app.put('/api/joboffer/add-visists/:id',validateToken,Joboffer.addVisitsCounter);
}