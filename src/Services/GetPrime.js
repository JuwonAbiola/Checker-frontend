import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL;

export const get = url => axios({ method: 'GET', url });

export const post = (url, data) => axios({
    method: 'POST',
    url,
    data
});