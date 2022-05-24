module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id : {
      allowNull : false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    purchaseValue: {
      type: Sequelize.FLOAT,
      allowNull : false,
    },
    salesValue: {
      type: Sequelize.FLOAT,
      allowNull : false,
    },
    stocks: {
      type: Sequelize.INTEGER,
      allowNull : false,
    },
    type: {
      type: Sequelize.STRING(100),
      allowNull : false,
    }
  },{
    timestamps: false
  })
  return Product
}