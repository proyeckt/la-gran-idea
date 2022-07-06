import {authServices} from './auth.services';

const axios = require('axios');


export const createJoboffer = (joboffer) => axios.post('http://localhost:8080/api/joboffers/create',{
    joboffer
},{headers: authServices.loadToken()});

export const getJoboffers = () => axios.get('http://localhost:8080/api/joboffers',{headers: authServices.loadToken()});

export const getJob = (id) => axios.get(`http://localhost:8080/api/job/${id}`,{headers: authServices.loadToken()});

export const deleteJob = (id) => axios.delete(`http://localhost:8080/api/joboffer/delete/${id}`,{headers: authServices.loadToken()});

export const editJoboofer = (id, joboffer) => axios.put(`http://localhost:8080/api/joboffer/edit/${id}`,{
    joboffer
},{headers: authServices.loadToken()});

export const addVisitsCounter = (id) => axios.put(`http://localhost:8080/api/joboffer/add-visists/${id}`);