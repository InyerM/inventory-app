module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("clients", {
    id : {
      allowNull : false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    names: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    lastnames: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    phone: {
      allowNull : false,
      type: Sequelize.STRING(15)
    }
  },{
    timestamps: false,
    indexes : [
      {
        unique : true,
        fields : ['phone']
      }
    ]
  })
  return Client
}