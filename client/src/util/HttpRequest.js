import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const get = async (path, options = {}) => {
    const response = await http.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, header) => {
    const response = await http.post(path, options, {
        headers: header,
    });
    return response.data;
};

export default http;
