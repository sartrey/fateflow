const source = require('./mysql/_source.js')()

async function loadEvent(query) {
  const Event = source.defines.Event
  if (query.id == null) return
  const result = await Event.findOne({
    where: query
  })
  return result
}

module.exports = loadEvent