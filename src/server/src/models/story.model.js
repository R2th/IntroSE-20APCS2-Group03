module.exports = (sequelize, DataTypes) =>{
    const Story = sequelize.define("story",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      file_id: {
        type: DataTypes.STRING,
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
      tag: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {
      // freezeTableName: true,
      // timestamps: true,
    });

  return Story;
}