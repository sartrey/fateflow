const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const util = require('util')

const readDir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const moveFile = util.promisify(fs.rename)
const killFile = util.promisify(fs.unlink)

/**
 * copy file
 *
 * @param {String} src
 * @param {String} dst
 * @returns
 */
async function copyFile(src, dst) {
  var buffer = await readFile(src)
  return writeFile(dst, buffer)
}

/**
 * make dir safely
 *
 * @param {String} dir
 * @returns
 */
function makeDir(dir) {
  return new Promise((resolve, reject) => {
    fs.access(dir, (error1) => {
      if (! error1) return resolve()
      fs.mkdir(dir, (error2) => error2 ? reject(error2) : resolve())
    })
  })
}

/**
 * make dir recursively
 *
 * @param {String} dir
 */
async function makeDeepDir(dir) {
  var parts = dir.split('/').filter(Boolean)
  var cursor = '/'
  for (var i = 0; i < parts.length; i ++) {
    cursor = path.join(cursor, parts[i])
    await makeDir(cursor)
  }
}

/**
 * get json message
 *
 * @param  {Assert} state
 * @param  {Object} value
 * @param  {String} label
 * @return {Object}
 */
function getJSON(state, value, label) {
  var o = { state: !!state }
  if (value != null) {
    if (label) {
      o[label] = value
    } else if (state) {
      o.model = value
    } else {
      o.error = value
    }
  }
  return o
}

/**
 * try to parse json
 * use default json if fail
 *
 * @param  {String} text
 * @param  {Object} json
 * @return {Object}
 */
function tryParseJSON(text, json) {
  try {
    var o = JSON.parse(text)
    return o
  } catch (error) {
    return json
  }
}

/**
 * load modules
 *
 * @param  {String} dir
 * @param  {Function} cb - callback fn(file, module)
 */
function loadModules(dir, cb) {
  var files = fs.readdirSync(dir)
  files.forEach(function (file) {
    // need *.js
    if (!/\.js$/.test(file)) return

    try {
      var o = require(path.join(dir, file))
      if (cb) cb(file, o)
    } catch (error) {
      console.error('failed to load', file)
      console.error(error.message)
    }
  })
}

/**
 * get hash
 *
 * @param {*} data
 * @param {String} algo
 * @returns {String} hash
 */
function getHash(data, algo) {
  var algorithm = algo || 'md5'
  var hash = crypto.createHash(algorithm)
  hash.update(data)
  return hash.digest('hex')
}

module.exports = {
  // directory
  readDir, makeDir, makeDeepDir,

  // file
  readFile, writeFile, moveFile, killFile, copyFile,

  // json
  getJSON, tryParseJSON,

  // module
  loadModules,

  // crypto
  getHash
}