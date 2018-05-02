const assist = require('../../kernel/assist.js')
const config = require('../../kernel/config.js')

const SIMPLE_DEPLOY = {
  mysql: {
    host: 'your-host',
    port: 3306,
    name: 'your-base',
    token: {
      username: 'your-username',
      password: 'your-password'
    },
    timeout: 1000
  }
}

async function loadConfig() {
  try {
    return await config.handle.getDeployConfig()
  } catch (error) {
    return SIMPLE_DEPLOY
  }
}

module.exports = loadConfig