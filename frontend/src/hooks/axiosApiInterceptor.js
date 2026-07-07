import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
    function (config) {

        const accessToken = localStorage.getItem('accessToken');

        config.headers.Authorization = 'Bearer' + ' ' + accessToken;
        return config;
    },
    function (error) {
        // Do something with the request error
        return Promise.reject(error);
    }
);

export default instance;