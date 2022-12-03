module.exports = (sequelize, DataTypes) =>{
    const Role = sequelize.define("roles", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        roleName:{
            type: DataTypes.STRING
        }
    })
    return Role;
}