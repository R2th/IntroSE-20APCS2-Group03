module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
      'comment',
      {
        // We don't need to define 'id' attribute since postgres do it automaticallly
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        story_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        parent_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
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
