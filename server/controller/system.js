module.exports = [
  {
    path: '/event/create',
    verb: 'get',
    body: async function () {
      var query = this.query
      var state = { query }
      return this.epii.view('/system/editEvent', state)
    }
  }
]