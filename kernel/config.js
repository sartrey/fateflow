const os = require('os')
const path = require('path')

const DEPLOY_ROOT = path.join(os.homedir(), '.timeaxis')

module.exports = {
  name: 'timeaxis',
  port: 8080,
  path: {
    root: path.join(__dirname, '../'),
    deploy: DEPLOY_ROOT,
    server: {
      controller: 'server/controller',
      middleware: 'server/middleware',
      datasource: 'server/datasource'
    },
    client: 'client',
    layout: 'layout',
    vendor: 'vendor',
    static: 'static',
    upload: 'upload'
  },
  prefix: {
    static: '__static'
  },
  deploy: null,
  online: process.env.NODE_ENV === 'production'
}
