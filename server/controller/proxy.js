const path = require('path')
const assist = require('../../kernel/assist.js')
const config = require('../../kernel/config.js')

const PROXY_DIR = path.join(config.path.root, config.path.server.datasource)

function loadAction(name) {
  var actionPath = path.join(PROXY_DIR, name)
  if (! config.online) {
    delete require.cache[require.resolve(actionPath)]
  }
  return require(actionPath)
}

async function callAction() {
  var proxyId = this.params.proxyId
  var reply = assist.getJSON(false, 'unknown')
  try {
    var action = loadAction(proxyId)
  } catch (error) {
    reply.error = error.message
  }
  try {
    var result = await action(this.query, this.request.body)
  } catch (error) {
    reply.error = error.message
  }
  reply = assist.getJSON(true, result)
  return this.epii.json(reply)
}

module.exports = [
  // GET proxy
  {
    path: '/proxy/:proxyId',
    verb: 'get',
    body: callAction
  },

  // POST proxy
  {
    path: '/proxy/:proxyId',
    verb: 'post',
    body: callAction
  }
]