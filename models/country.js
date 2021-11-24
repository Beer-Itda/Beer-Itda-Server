module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Country', {
    //제조국가
    country: {
      type: DataTypes.STRING(20),
      unique: 'compositeIndex',
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};