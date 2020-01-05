import { Role } from "./types"

export const useUserInfo = () => {
    // save data in context instead
    const token = localStorage.getItem('token')
    const role: Role | null = localStorage.getItem('role') as Role | null

    return {
        token,
        role,
    }
}