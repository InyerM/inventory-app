module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id : {
      allowNull : false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    role: {
      type: Sequelize.STRING(10),
      allowNull : false,
    },
    names: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    lastnames: {
      type: Sequelize.STRING(100),
      allowNull : false,
    },
    username: {
      allowNull : false,
      type: Sequelize.STRING(50)
    },
    passwordHash: {
      allowNull : false,
      type: Sequelize.STRING(250)
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
        fields : ['username', 'phone']
      }
    ]
  })
  return User
}