var crypto = require('crypto');

module.exports = {
    database: {
        default: {
            host: '127.0.0.1',
            database: 'test',
            user: 'root',
            pass: '',
            port: 27017,
            db: {native_parser: true},
            server: {poolSize: 50, socketOptions: {keepAlive: 1}},
            replset: {}
        },
        session: {
            host: '127.0.0.1',
            database: 'sessionStore',
            user: 'root',
            pass: '',
            port: 27017,
            db: {native_parser: true},
            server: {poolSize: 50, socketOptions: {keepAlive: 1}},
            replset: {}
        }
    },
    port: 9090,
    defaultLocale: {
        lang: 'pt-br'//,
        //options:{
        // months:[],
        // monthsShort:[],
        // weekdays:[],
        //weekdaysShort :[],
        // weekdaysMin:[]
        // }
    }
};