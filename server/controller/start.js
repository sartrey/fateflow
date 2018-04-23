module.exports = [
  {
    path: '/',
    verb: 'get',
    body: async function () {
      return this.epii.view('/start')
    }
  },

  {
    path: '/direct',
    verb: 'get',
    body: async function () {
      return this.epii.view('/entry/direct')
    }
  },

  {
    path: '/sprint',
    verb: 'get',
    body: async function () {
      return this.epii.view('/entry/sprint')
    }
  },

  {
    path: '/report',
    verb: 'get',
    body: async function () {
      return this.epii.view('/entry/report')
    }
  }
]