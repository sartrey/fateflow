const source = require('./mysql/_source.js')()

async function saveEvent(query, input) {
  if (Object.keys(input).length === 0) {
    throw new Error('empty input')
  }
  const Event = source.defines.Event
  // insert event
  if (input.id == null) {
    let model = Event.build({
      parent: input.parent,
      status: 3,
      expect: input.expect,
      elapse: 0,
      title: input.title,
      content: input.content,
      sprint: null
    })
    return model.save().then(() => model)
  }
}

module.exports = saveEvent

/**
 * update trace
 *
 * @param  {Object} query
 * @param  {Object} model
 * @return {Promise}
 */
// function update(query, model) {
//   query.flag = { [Op.gte]: 0 }
//   return mysqlM.findOne({
//     where: _.pick(query, ['id', 'flag'])
//   })
//   .catch(softError)
//   .then(m => {
//     if (!m) throw new Error('trace not found')
//     var now = Date.now()
//     // not support <entry>, <files>, <order>, <token>
//     if (model.size != null) m.size = model.size
//     if (model.hash) m.hash = model.hash
//     if (model.host) m.host = model.host
//     if (model.tags) m.tags = model.tags
//     if (model.flag != null) m.flag = model.flag
//     if (model.time != null) m.time = model.time
//     if (model.error != null) m.error = model.error
//     m.utime = now
//     m.logs = _.concat(m.logs, { time: now, flag: m.flag, text: 'update' })
//     if (model.error) m.error = model.error
//     return m.save().then(() => m).catch(softError)
//   })
// }
