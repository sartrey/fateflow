const config = require('../../kernel/config.js')

function saveConfig(query, input) {
  // todo - lint config
  return config.handle.saveConfig(input)
}

module.exports = saveConfig