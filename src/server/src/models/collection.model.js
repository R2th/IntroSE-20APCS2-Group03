module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
      'collection',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
  return Collection;
};

