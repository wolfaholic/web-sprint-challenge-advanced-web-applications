// ✨ implement axiosWithAuth - Done

import axios from 'axios';


export default function axiosWithAuth() {
    const token = localStorage.getItem('token')

    return axios.create({
        Authorization: token
    })
}
