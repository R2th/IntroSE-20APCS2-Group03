module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define(
    'reaction',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      story_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      react_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[-1, 1]],
        },
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

  return Reaction;
};
