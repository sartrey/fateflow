const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../kernel/config.js')

const source = {
  created: false,
  context: null,
  defines: []
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
    var createDefine = require(path.join(rootdir, file))
    var modelName = file.slice(0, - 3).split('-')
      .map(e => e[0].toUpperCase() + e.slice(1)).join('')
    sources[modelName] = createDefine(context)
  })
  return sources
}

module.exports = async function (ctx, next) {
  // skip start page
  const skipURLs = [
    '/', '/admin/deploy', /^\/proxy/
  ]
  if (skipURLs.some(e => e.test ? e.test(ctx.url) : e === ctx.url)) {
    return next()
  }
  // try to load source
  if (! source.created) {
    source.context = makeContext(config.deploy.mysql)
    source.defines = loadDefines(
      source.context,
      path.join(config.path.root, config.path.server.datasource, 'mysql')
    )
    // source.defines.forEach((define) => define.sync())
    source.created = true
    ctx.app.epii.cache('source', source)
  }
  await next()
}
