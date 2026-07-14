import axios from 'axios';
const instance = axios.create();


instance.interceptors.request.use(
    function (config) {

        const accessToken = localStorage.getItem('accessToken');

        config.headers.Authorization = 'Bearer' + ' ' + accessToken;
        return config;
    },    
    function (error) {
        console.log("ERROR")
        // Do something with the request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
   if(error.status === 401){
    window.location ='/login';
   }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;