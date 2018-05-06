const path = require('path')
const assist = require('./kernel/assist.js')
const config = require('./kernel/config.js')

async function setupServer() {
  assist.makeDeepDir(config.path.deploy)
  try {
    await config.handle.getDeployConfig()
  } catch (error) {
    console.log(`access http://localhost:${config.port}/admin/deploy`)
  }
}

function startServer() {
  require('epii-server')(config)
  if (! config.online) {
    require('epii-render').watch(config)
  }
}

(async function main() {
  await setupServer()
  startServer()
})()
