export default {
    port: process.env.PORT || '3002',
    database: {
        url: process.env.URL || 'mongodb://localhost:28000/invoicerr',
        password: process.env.PASSWORD,
    },
    communicationSecret: process.env.COMMUNICATION_SECRET || 'secret',
    services: {
        auth: 'http://localhost:3000',
        contacts: 'http://localhost:3001'
    }
}