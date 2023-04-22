import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/api/";
// axios.defaults.baseURL = "http://31.220.6.97/api/";
// axios.defaults.baseURL = "https://api.wingame.tech/api/";
axios.defaults.headers = {
    'Content-Type': 'application/json',
}

export default axios;