const config = require('../../kernel/config.js')

function setDeployConfig(query, input) {
  // todo - lint config
  return config.handle.setDeployConfig(input)
}

module.exports = setDeployConfig