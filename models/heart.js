module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Heart', {
    //User 테이블 FK
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //Beer 테이블 FK
    beer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //찜 여부
    heart: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: true,
  });
};