export default {
    port: process.env.PORT || '3000',
    database: {
        url: process.env.MONGO_URL || 'mongodb://localhost:28000/invoicerr',
        password: process.env.PASSWORD,
    },
    jwtSecret: process.env.JWT_SECRET || 'secret',
    communicationSecret: process.env.COMMUNICATION_SECRET || 'secret'
}