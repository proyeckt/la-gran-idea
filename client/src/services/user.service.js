const axios = require('axios');

export const createUser = (user) => axios.post('http://localhost:8080/api/users/create',{
    user
});
