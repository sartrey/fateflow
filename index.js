const path = require('path')
const assist = require('./kernel/assist.js')
const config = require('./kernel/config.js')

function setupServer() {
  assist.makeDeepDir(config.path.deploy)
  var configPath = path.join(config.path.deploy, 'config.json')
  try {
    var configBody = require(configPath)
    config.deploy = configBody
  } catch(error) {
    console.log(`access http://localhost:${config.port}/admin/deploy`)
  }
}

function startServer() {
  require('epii-server')(config)
  if (! config.online) {
    require('epii-render').watch(config)
  }
}

(function main() {
  setupServer()
  startServer()
})()
