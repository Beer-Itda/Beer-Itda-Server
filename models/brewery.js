module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Brewery', {
    //제조사(영어)
    brewery: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};