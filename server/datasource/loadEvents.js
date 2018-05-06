const source = require('./mysql/_source.js')()

async function loadEvents(query) {
  const Event = source.defines.Event
  const result = await Event.findAll({
    where: query
  })
  return result
}

module.exports = loadEvents