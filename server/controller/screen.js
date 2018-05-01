module.exports = [
  {
    path: '/',
    verb: 'get',
    body: async function () {
      return this.epii.view('/screen/launch')
    }
  },

  {
    path: '/direct/:eventId?',
    verb: 'get',
    body: async function () {
      return this.epii.view('/screen/direct', {
        query: {
          eventId: this.params.eventId
        }
      })
    }
  },

  {
    path: '/sprint',
    verb: 'get',
    body: async function () {
      return this.epii.view('/screen/sprint')
    }
  },

  {
    path: '/report',
    verb: 'get',
    body: async function () {
      return this.epii.view('/screen/report')
    }
  }
]