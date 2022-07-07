import {authServices} from './auth.services';

const axios = require('axios');

const API_URL = 'http://localhost:8080/api/';

export const createJoboffer = (joboffer) => axios.post('joboffers/create',{
    joboffer
},{headers: authServices.loadToken()});

export const getJoboffers = () => axios.get(API_URL+'joboffers',{headers: authServices.loadToken()});

export const getJob = (id) => axios.get(API_URL+`job/${id}`,{headers: authServices.loadToken()});

export const deleteJob = (id) => axios.delete(API_URL+`joboffer/delete/${id}`,{headers: authServices.loadToken()});

export const editJoboofer = (id, joboffer) => axios.put(API_URL+`joboffer/edit/${id}`,{
    joboffer
},{headers: authServices.loadToken()});

export const addVisitsCounter = (id) => axios.put(API_URL+`joboffer/add-visits/${id}`,{headers:authServices.loadToken()});