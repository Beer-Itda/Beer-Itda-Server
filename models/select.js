module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Select', {
    //Select 테이블 FK
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //맥주 스타일
    style: {
      type: DataTypes.STRING(20),
      unique: 'style',
      allowNull: true,
    },
    //맥주 향
    aroma: {
      type: DataTypes.STRING(20),
      unique: 'aroma',
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};