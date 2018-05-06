const source = require('./mysql/_source.js')()
const { Op } = require('sequelize')

async function killEvent(query, input) {
  if (Object.keys(input).length === 0) {
    throw new Error('empty input')
  }
  const Event = source.defines.Event
  if (input.id == null) {
    throw new Error('unknown event')
  }
  const model = await Event.findOne({ where: { id: input.id } }).catch(error => null)
  if (! model) {
    throw new Error('unknown event')
  }
  const blockCount = await Event.count({
    // todo - add chain events
    where: { parent: input.id, status: { [Op.or]: [2, 3] } }
  }).catch(error => 0)
  console.log('block count', blockCount)
  if (blockCount > 0) {
    throw new Error('events block')
  }
  return model.destroy()
}

module.exports = killEvent