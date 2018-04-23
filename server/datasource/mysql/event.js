const Sequelize = require('sequelize')

module.exports = function (database) {
  const Event = database.define(
    // table name
    'timeaxis_event',

    // table schema
    {
      // id = event id
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },

      // parent = parent event id
      parent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1
      },

      // status = 3 - idle, 2 - busy, 1 - halt, 0 - done
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 3
      },

      // expect = expected time by minutes
      // 1 day = 1440 min
      expect: {
        type: Sequelize.INTEGER,
      },

      // elapse = elapsed time by minutes
      elapse: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      // title = event title
      title: {
        type: Sequelize.STRING(512),
        allowNull: false
      },

      // title = event content
      content: {
        type: Sequelize.TEXT('LONG'),
        allowNull: true
      },

      // sprint = sprint name
      sprint: {
        type: Sequelize.STRING(512),
        allowNull: true
      }
    },

    // table settings
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  )
  return Event
}
