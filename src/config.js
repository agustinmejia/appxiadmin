module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'root',
        database: process.env.DATABASE_NAME || 'appxiadmin'
    },
    url: 'http://127.0.0.1',
    debug: true,
    qrSimple: 'https://mystorage.loginweb.dev/storage/Projects/appxi/bgCompartir.png',
    port: process.env.PORT || 4000,
    telegram: {
        token: '1451212413:AAE-6y0BXIuMqOS90ER0X8FYZRHobBMSP5o',
        api: 'https://api.telegram.org'
    }
};