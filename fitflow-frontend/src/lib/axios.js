import  Axios  from "axios";

const API_URL = '/api';
export const axios = Axios.create({
    baseURL: API_URL,
});