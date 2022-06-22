'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    // タスク一覧を返却 (C"R"UD)
    static async getAll(){
      try{
        const tasks = await this.findAll({
          include: 'Category',
          attributes: ['id', 'title', 'done', 'Category.name'],
          order: [
            ['id', 'ASC']
          ]
        })
        return(tasks)
      }
      catch(e){
        console.error(e)
        return(false)
      }
    }

    // タスクを追加 ("C"RUD)
    static async add(value){
      try{
        const task = await this.create({
          title: value.title,
          categoryId: value.category,
        })
        return(task)
      }
      catch(e){
        console.error(e)
        return(false)
      }
    }

    // タスクを追加 ("C"RUD)
    static async add(value){
      try{
        const task = await this.create({
          title: value.title,
          categoryId: value.category,
        })
        return(task)
      }
      catch(e){
        console.error(e)
        return(false)
      }
    }

    // ステータスを変更する (CR"U"D)
    static async done(id, flag=true){
      try{
        await this.update({done: flag}, {
          where:{
            id
          }
        })
        return(true)
      }
      catch(e){
        console.error(e)
        return(false)
      }
    }

    // タスクを物理削除 (CRU"D")
    static async remove(id){
      try{
        await this.destroy({
          where:{
            id
          }
        })
        return(true)
      }
      catch(e){
        console.error(e)
        return(false)
      }
    }

    static associate(models) {
      Task.belongsTo(models.Category, {
        foreignKey: 'categoryId',  // デフォルト値なので未指定でも可
        targetKey: 'id'            // 〃
      })
    }
  }

  Task.init({
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
    freezeTableName: true
  });

  Task.beforeCreate(async (instance, _option) => {
    const now = new Date();
    instance.createdAt = now;
    instance.updatedAt = now;
  })

  Task.beforeUpdate(async (instance, _options) => {
    const now = new Date();
    instance.updatedAt = now;
  })

  return Task;
};