'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      // define association here
    }
  }

  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true,
    timestamps: false
  });

  Category.beforeCreate(async (instance, _option) => {
    const now = new Date();
    instance.createdAt = now;
    instance.updatedAt = now;
  })

  Category.beforeUpdate(async (instance, _options) => {
    const now = new Date();
    instance.updatedAt = now;
  })

  return Category;
};