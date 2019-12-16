import AuthModel from '../models/auth'

const authService = {
    addUser: async (username: string, password: string, role: string) => {
        try {
            const newUser = new AuthModel({
                username: username,
                password: password,
                role: role,
                isActive: true
              })
              await newUser.save()
              return newUser
        } catch (e) {
            throw new Error('Username already exists!');
        }
    }
}

export default authService