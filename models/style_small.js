module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Style_Small', {
    //소분류
    small_name: {
      type: DataTypes.STRING(45),
      unique: 'compositeIndex',
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};