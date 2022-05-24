module.exports = (sequelize, Sequelize) => {
  const Credit = sequelize.define("credits", {
    id : {
      allowNull : false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    purchaseId : {
      allowNull : false,
      type: Sequelize.INTEGER
    },
    debt : {
      allowNull : false,
      type: Sequelize.FLOAT
    }
  },{
    timestamps: false,
    indexes : [
      {
        unique : true,
        fields : ['purchaseId']
      }
    ]
  })
  return Credit
}