import axios from 'axios';
import api from './api';

export const axiosInstance = axios.create({
    baseURL: api,
    // Anda juga dapat menambahkan konfigurasi lainnya di sini
});
