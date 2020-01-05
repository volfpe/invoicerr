import { apiCall } from "../../../utils/helpers"
import { API_ENDPOINTS } from "../../../config"
import { Api404Error } from "../../../utils/errors"

export const getUsers = async () => {
    return (await apiCall(API_ENDPOINTS.GET_USERS, 'get')).data
}

export const addUser = async (username: string, password: string, role: string) => {
    return (await apiCall(API_ENDPOINTS.ADD_USER, 'post', {username, password, role})).data
}

export const editUser = async (id: string, password: string, role: string) => {
    return (await apiCall(API_ENDPOINTS.ADD_USER, 'put', {id, password, role})).data
}

export const getUser = async (id: string) => {
    try {
        return (await apiCall(API_ENDPOINTS.GET_USER + '/' + id, 'get')).data
    } catch (e) {
        throw new Api404Error()
    }
}

export const deleteUser = async (id: string) => {
    return (await apiCall(API_ENDPOINTS.DELETE_USER + '/' + id, 'delete')).data
}