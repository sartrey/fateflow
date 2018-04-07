module.exports = [
  {
    path: '/',
    verb: 'get',
    body: async function () {
      return this.epii.view('/start')
    }
  },

  {
    path: '/admin/deploy',
    verb: 'get',
    body: async function () {
      return this.epii.view('/admin/deploy')
    }
  }
]