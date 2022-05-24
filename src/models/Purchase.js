module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define("purchases", {
    id : {
      allowNull : false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull : false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull : false,
    },
    purchaseDate: {
      type: Sequelize.DATE,
      allowNull : false,
    },
    discount: {
      type: Sequelize.INTEGER,
      allowNull : false,
    },
  },{
    timestamps: false,
  })
  return Purchase
}