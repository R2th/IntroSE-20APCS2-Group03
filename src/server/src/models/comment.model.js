module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
      'comment',
      {
        comment_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        story_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
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

  return Comment;
};
