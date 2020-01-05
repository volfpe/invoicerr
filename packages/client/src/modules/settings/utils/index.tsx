import { apiCall } from "../../../utils/helpers"
import { API_ENDPOINTS } from "../../../config"

export const changePassword = async (oldPassword: string, newPassword: string) => {
    return (await apiCall(API_ENDPOINTS.CHANGE_PASSWORD, 'post', {newPassword, oldPassword})).data
}