module.exports = [
  {
    path: '/events/:eventId?',
    verb: 'get',
    body: async function () {
      return this.epii.view('/expert/listEvents', {
        query: {
          eventId: this.params.eventId
        }
      })
    }
  },

  {
    path: '/event/create',
    verb: 'get',
    body: async function () {
      var query = this.query
      return this.epii.view('/expert/editEvent', { query })
    }
  }
]