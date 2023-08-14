import axios from  'axios';

import store from '../store';

const api = axios.create({
    baseURL:'/api',
    headers:{
        'Content-Type':'application/json'
    }
});



