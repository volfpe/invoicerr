import AuthModel from '../models/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

interface UserTokenData {
    _id: string
    isActive: boolean
    username: string
    role: string
}

const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                reject(err)
            }
            resolve(hash)
        });
    });
}

const validatePassword = (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

const authService = {
    addUser: async (username: string, password: string, role: string) => {

        const hashedPassword = await hashPassword(password)

        const newUser = new AuthModel({
            username: username,
            password: hashedPassword,
            role: role,
            isActive: true
        })
        try {
              await newUser.save()
              return newUser
        } catch (e) {
            throw new Error('Username already exists!');
        }
    },
    loginUser: async (username: string, password: string) => {
        const user = await AuthModel.where('username', username).findOne()
        if (!user) {
            return false
        }
        const passwordMatch = await validatePassword(password, user.password)
        if (!passwordMatch) {
            return false
        }
        const userTemp = user.toObject()
        delete userTemp.password
        const userObject: UserTokenData = userTemp;
        const token = jwt.sign(userObject, config.jwtSecret);
        return token
    },
    getUser: async (jwtToken: string) => {
        try {
            const userData = jwt.verify(jwtToken, config.jwtSecret) as UserTokenData;
            // check if user have not been deactivated
            const user = await AuthModel.where('_id', userData._id).findOne()
            if (!user || !user.isActive || user.role != userData.role) {
                return null
            }
            return user.toObject()
        } catch(e) {
            return null
        }
    }
}

export default authService