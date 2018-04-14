const os = require('os')
const path = require('path')
const assist = require('./assist.js')

const DEPLOY_ROOT = path.join(os.homedir(), '.timeaxis')
const CONFIG = {
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
  online: process.env.NODE_ENV === 'production',
  handle: null
}

async function getDeployConfig() {
  var deployPath = path.join(DEPLOY_ROOT, 'config.json')
  // todo - load config manually
  var deployBody = JSON.parse(await assist.readFile(deployPath))
  CONFIG.deploy = deployBody
  return deployBody
}

function setDeployConfig(input) {
  var deployPath = path.join(DEPLOY_ROOT, 'config.json')
  return assist.writeFile(deployPath, JSON.stringify(input))
}

CONFIG.handle = {
  getDeployConfig,
  setDeployConfig
}
module.exports = CONFIG