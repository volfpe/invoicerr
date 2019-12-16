export default {
    port: process.env.PORT || '3000',
    database: {
        url: process.env.URL,
        password: process.env.PASSWORD,
    },
}