module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Taste', {
    //맛 이름
    taste: {
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