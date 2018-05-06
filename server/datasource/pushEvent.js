const source = require('./mysql/_source.js')()
const { Op } = require('sequelize')

async function pushEvent(query, input) {
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
  if (input.status === 1) {
    if (blockCount > 0) throw new Error('events block')
    model.status = 1
  } else if (input.status === 3) {
    model.status = 3
  } else {
    if (model.status === 3) {
      model.status = 2
    } else if (model.status === 2) {
      if (blockCount > 0) throw new Error('events block')
      model.status = 0
    } else if (model.status === 1) {
      throw new Error('event halt')
    } else if (model.status === 0) {
      throw new Error('event done')
    }
  }
  model.elapse = Math.floor((Date.now() - model.created_at.getTime()) / 1000)
  return model.save().then(() => model)
}

module.exports = pushEvent