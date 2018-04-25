const source = require('./mysql/_source.js')()

async function createEvent() {
  var Event = source.defines.Event
  var result = await Event.findAll()
  console.log(result)
}

module.exports = createEvent