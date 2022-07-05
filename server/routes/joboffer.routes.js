const {validateToken} = require('../controllers/auth.controller');

const { 
    createJoboffer,
    getJoboffers,
    getJobById,
    deleteJob,
    updateJob,
    addVisitsCounter
 } = require('../controllers/joboffer.controller');

module.exports = (app) => {
    app.get('/api/joboffers',validateToken,getJoboffers);
    app.post('/api/joboffers/create',validateToken,createJoboffer);
    app.get('/api/job/:id',validateToken,getJobById);
    app.delete('/api/joboffer/delete/:id',validateToken,deleteJob);
    app.put('/api/joboffer/edit/:id',validateToken,updateJob);
    app.put('/api/joboffer/add-visists/:id',validateToken,addVisitsCounter);
}