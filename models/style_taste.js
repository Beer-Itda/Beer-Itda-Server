module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Style_Taste', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    //평가점수
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};