module.exports = [
  {
    path: '/',
    verb: 'get',
    body: async function () {
      return this.epii.view('/system/launch')
    }
  },
  
  {
    path: '/system/launch',
    verb: 'get',
    body: async function () {
      return this.epii.view('/system/launch')
    }
  },

  {
    path: '/system/deploy',
    verb: 'get',
    body: async function () {
      return this.epii.view('/system/deploy')
    }
  }
]