var crypto = require('crypto');

module.exports = {
    database: {
        default: {
            host: '127.0.0.1',
            database: 'admin',
            user: 'admin',
            pass: '123teste',
            port: 27017,
            db: {native_parser: true},
            server: {poolSize: 5, socketOptions: {keepAlive: 1}},
            replset: {}
        },
        session: {
            host: 'ds047095.mongolab.com',
            database: 'rpgsession',
            user: 'admin_rpgbuilder',
            pass: '8u5etrathap5etrac5Bu',
            port: 47095,
            db: {native_parser: true},
            server: {poolSize: 5, socketOptions: {keepAlive: 1}},
            replset: {}
        },
        rpgbuilder:{
            host: 'ds047095.mongolab.com',
            database: 'rpgbuilder',
            user: 'admin_rpgbuilder',
            pass: '8u5etrathap5etrac5Bu',
            port: 47095,
            db: {native_parser: true},
            server: {poolSize: 5, socketOptions: {keepAlive: 1}},
            replset: {}
        }
    },
    port: 8080,
    defaultLocale: {
        lang: 'pt-br'//,
        //options:{
        // months:[],
        // monthsShort:[],
        // weekdays:[],
        //weekdaysShort :[],
        // weekdaysMin:[]
        // }
    },
    dirs:[
        'animations',
        'backgrounds',
        'tilesets'
    ]
};