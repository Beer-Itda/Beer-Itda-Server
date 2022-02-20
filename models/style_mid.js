module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Style_Mid', {
    //중분류
    mid_name: {
      type: DataTypes.STRING(45),
      unique: 'compositeIndex',
      allowNull: false,
    },
    //설명
    mid_description: {
      type: DataTypes.STRING(45),
      unique: false,
      allowNull: false,
    },
    //스타일 별 향 점수
    aroma_1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_5: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_6: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  })
};