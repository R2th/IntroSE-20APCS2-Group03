module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define(
    'draft',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.ARRAY(DataTypes.STRING),
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
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
  return Draft;
};
