module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Aroma', {
    //향 이름
    aroma: {
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