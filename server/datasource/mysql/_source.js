const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../../kernel/config.js')

const SOURCES = {
  created: false,
  context: null,
  defines: {},
  handler: {
    softError
  }
}

function softError(error) {
  console.log(error)
  throw new Error('mysql error')
}

/**
 * create mysql context
 *
 * @param  {Object} options
 * @return {Object} sequelize instance
 */
function makeContext(options) {
  if (! (
    options &&
    options.name && options.host && options.port &&
    options.token
  )) {
    throw new Error('invalid mysql config')
  }
  // mysql connection string
  var url = `mysql://${options.host}:${options.port}/${options.name}`
  console.log(url)
  // connect
  return new Sequelize(
    options.name,
    options.token.username, options.token.password,
    {
      host: options.host,
      port: options.port,
      dialect: 'mysql',
      pool: { max: 5, min: 0, idle: 10000 },
      logging: false,
      define: {
        freezeTableName: true,
        timestamps: false
      }
    }
  )
}

/**
 * load defines
 *
 * @param  {Object} context
 * @param  {String} rootdir
 * @return {Object} sequelize instance
 */
function loadDefines(context, rootdir) {
  var sources = {}
  var files = fs.readdirSync(rootdir).filter((e) => /\.js$/.test(e))
  files.forEach((file) => {
    if (file === '_source.js') return
    var createDefine = require(path.join(rootdir, file))
    var modelName = file.slice(0, - 3).split('-')
      .map(e => e[0].toUpperCase() + e.slice(1)).join('')
    sources[modelName] = createDefine(context)
  })
  return sources
}

function getSources() {
  // try to load source
  if (! SOURCES.created) {
    SOURCES.context = makeContext(config.deploy.mysql)
    SOURCES.defines = loadDefines(
      SOURCES.context,
      path.join(config.path.root, config.path.server.datasource, 'mysql')
    )
    // source.defines.forEach((define) => define.sync())
    SOURCES.created = true
  }
  return SOURCES
}

module.exports = getSources
