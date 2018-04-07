const path = require('path')
const assist = require('../../kernel/assist.js')
const config = require('../../kernel/config.js')

function loadProxy() {
  var proxyDir = path.join(config.path.root, config.path.server.datasource)
  var proxies = []
  assist.loadModules(proxyDir, function (file, action) {
    var route = { 
      path: '/proxy/' + file.slice(0, -3), 
      verb: action.verb || 'get', 
      body: async function () {
        return this.epii.json(await action())
      }
    }
    proxies.push(route)
  })
  return proxies
}

module.exports = loadProxy()