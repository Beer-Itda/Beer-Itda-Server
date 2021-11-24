module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Level', {
    //등급
    level: {
      type: DataTypes.STRING(10),
      unique: 'compositeIndex',
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};