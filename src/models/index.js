'use strict'
const dbConfig = require('../config/config')

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Client = require("./Client")(sequelize, Sequelize)
db.Credit = require("./Credit")(sequelize, Sequelize)
db.Product = require("./Product")(sequelize, Sequelize)
db.Purchase = require("./Purchase")(sequelize, Sequelize)
db.User = require("./User")(sequelize, Sequelize)

db.Purchase.hasOne(db.Credit, {
  foreingKey : 'id'
})
db.Credit.belongsTo(db.Purchase, {
  foreingKey : 'purchaseId'
})

db.Product.hasOne(db.Purchase, {
  foreingKey : 'id'
})
db.Purchase.belongsTo(db.Product, {
  foreingKey : 'productId'
})

db.Client.hasOne(db.Purchase, {
  foreingKey : 'id'
})
db.Purchase.belongsTo(db.Client, {
  foreingKey : 'clientId'
})

module.exports = db