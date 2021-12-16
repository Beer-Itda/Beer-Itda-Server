module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    //리뷰 내용
    content: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    //별점
    star: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestammps: true
  }
  );
};