module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'user',
      {
        username: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING,
        },
        bio: {
          type: DataTypes.STRING,
        },
        isActivate: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        isPremium: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        // freezeTableName: true,
        // timestamps: true,
      },
  );

  return User;
};
