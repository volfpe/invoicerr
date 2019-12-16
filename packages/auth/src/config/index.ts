export default {
    port: process.env.PORT || '3000',
    database: {
        url: process.env.URL || 'mongodb://localhost:28000/invoicerr',
        password: process.env.PASSWORD,
    },
}