import axios from 'axios'
import config from '../config'

export const apiCall = async (url: string, method: 'get' | 'post' | 'delete' | 'put', data?: object) => {
    // get token
    const token = localStorage.getItem('token')

    const headers: any = {}

    if (token) {
        headers.authorization = token
    }

    try {
        return await axios({
            method,
            url: config.API_URL + url,
            data,
            headers
        })
    } catch (e) {
        // todo detect response codes and logout user
        throw e
    }
}