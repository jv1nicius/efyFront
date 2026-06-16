import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://3-208-80-172.sslip.io'
})