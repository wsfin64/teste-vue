const fs = require('fs')

module.exports = {
    devServer: {
    port:8081,

    https: true,
    key: fs.readFileSync('/home/wellington/projetos/vue-bootstrap/bootstrap/cert/localhost-key.pem'),
    cert: fs.readFileSync('/home/wellington/projetos/vue-bootstrap/bootstrap/cert/localhost.pem'),
    https: true,
    hotOnly: false,
    }
}
