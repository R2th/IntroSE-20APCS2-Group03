module.exports = (sequelize, DataTypes) =>{
    const Story = sequelize.define("story",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      file_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      media_list: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      views:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tag: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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