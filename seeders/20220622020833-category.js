'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Category', [
      {name: '仕事'},
      {name: 'プライベート'},
      {name: '町内会'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {truncate:true});
  }
};
