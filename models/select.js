module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Select', {
    //맥주 스타일
    style: {
      type: DataTypes.STRING(20),
      unique: false,
      allowNull: true,
    },
    //맥주 향
    aroma: {
      type: DataTypes.STRING(20),
      unique: false,
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};