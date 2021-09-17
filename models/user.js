module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    //유저 이메일(로그인할 때 사용되는 아이디)
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    //유저 닉네임 (최대 10자 최소 2자)
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    //리뷰의 수 
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //활성계정여부
    active: {
      type: DataTypes.STRING(3),
      defaultValue: 'Y',
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};