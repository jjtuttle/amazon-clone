import axios from 'axios';


const instance = axios.create({
    // API (cloud function) URL
    baseURL:'' 
});


export default instance