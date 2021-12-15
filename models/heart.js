module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Heart', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    }, {
      //옵션지정
      freezeTableName: true,
      timestamps: false,
    }
  )
};