module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
      'story',
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        contents: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        contents_short: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        media_list: {
          type: new DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        author_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tag: {
          type: new DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        views: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isPremium: {
          type: DataTypes.BOOLEAN,
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
  return Story;
};
