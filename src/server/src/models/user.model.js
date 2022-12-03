module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("users",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar:{
        type: DataTypes.STRING
      },
      bio:{
        type: DataTypes.STRING
      },
      isActivate:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isPremium:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt:{
        type: DataTypes.DATE
      },
      updatedAt:{
        type: DataTypes.DATE
      }
    },
    {
      // freezeTableName: true,
      // timestamps: true,
    });

  return User;
}