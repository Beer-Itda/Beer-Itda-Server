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
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  })
};