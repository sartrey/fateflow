module.exports = [
  {
    path: '/events/:eventId?',
    verb: 'get',
    body: async function () {
      return this.epii.view('/expert', {
        query: {
          eventId: this.params.eventId
        }
      })
    }
  }
]