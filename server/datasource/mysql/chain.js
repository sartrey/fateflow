const Sequelize = require('sequelize')

module.exports = function (database) {
  const Chain = database.define(
    // table name
    'timeaxis_chain',

    // table schema
    {
      // id = chain id
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },

      // last = last event id
      last: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      // next = next event id
      next: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      // level = chain level = 0 - block, > 0 - more elastic, max 99
      level: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },

      // reason = chain reason
      reason: {
        type: Sequelize.STRING,
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
  return Chain
}
