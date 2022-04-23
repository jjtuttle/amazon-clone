import axios from 'axios';


const instance = axios.create({
    // API (cloud function) URL
    baseURL:'http://localhost:5001/clone-e8984/us-central1/api'  // developer endpoint
    // baseURL: "https://us-central1-clone-e8984.cloudfunctions.net/api"  // deployed endpoint
});


export default instance