module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Style_Big', {
    //대분류
    big_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};