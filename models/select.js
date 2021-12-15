module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Select', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    //맥주 스타일
    style: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    //맥주 향
    aroma: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};