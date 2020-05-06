import axios from 'axios';

const Api = axios.create({
    // PARA ANDROID
    baseURL: 'http://10.0.2.2:3333',

    //baseURL: 'http://localhost:3333',
});

export default Api;
