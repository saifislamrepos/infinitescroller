const path = require('path');
const envvariables = {
    development : {
        PORT : 3002,
        SERVER:"localhost:",
        ROOT_DIR:path.resolve(__dirname, '../'),
        DB_PORT:27017,
        DB_SERVER:'localhost:',
        DB:'/userdata'
    },
    prod : {
        PORT : 3000,
        SERVER:"localhost:",
        ROOT_DIR:path.resolve(__dirname, '../'),
        DB_PORT:27017,
        DB_SERVER:'localhost:',
        DB:'/userdata'
    }
}
module.exports = envvariables;