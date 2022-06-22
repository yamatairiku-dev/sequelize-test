'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Task', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      categoryId:{
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'Category',
            key: 'id'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{ Sequelize, timestamps: true });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Task');
  }
};