'use strict';
import runner from '../runner'

export default {
  up: (queryInterface, Sequelize) => {
    const CREATE_USERS = () => (
      queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        first_name: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(250),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        supplier: {
          type: Sequelize.STRING(250),
          allowNull: true
        },
        username: {
          type: Sequelize.STRING(250),
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      })
    )

    return runner.run([
      () => CREATE_USERS(),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('users')
    ])
  }
};
