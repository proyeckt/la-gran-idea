const { 
    createJoboffer,
    getJoboffers,
    getJobById,
    deleteJob,
    updateJob,
    addVisitsCounter
 } = require('../controllers/joboffer.controller');

module.exports = (app) => {
    app.get('/api/joboffers',getJoboffers);
    app.post('/api/joboffers/create',createJoboffer);
    app.get('/api/job/:id',getJobById);
    app.delete('/api/joboffer/delete/:id',deleteJob);
    app.put('/api/joboffer/edit/:id',updateJob);
    app.put('/api/joboffer/add-visists/:id',addVisitsCounter);
}