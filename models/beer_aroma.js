module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Beer_Aroma', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};