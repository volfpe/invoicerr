export default {
    port: process.env.PORT || '3002',
    database: {
        url: process.env.MONGO_URL || 'mongodb://localhost:28000/invoicerr',
        password: process.env.PASSWORD,
    },
    communicationSecret: process.env.COMMUNICATION_SECRET || 'secret',
    services: {
        auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
        contacts: process.env.CONTACTS_SERVICE_URL || 'http://localhost:3001'
    }
}