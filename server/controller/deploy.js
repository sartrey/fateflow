module.exports = [
  {
    path: '/deploy',
    verb: 'get',
    body: async function () {
      return this.epii.view('/deploy')
    }
  }
]