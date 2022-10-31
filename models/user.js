module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "고유번호 ID",
    },
    //유저 이메일(로그인할 때 사용되는 아이디)
    email: {
      type: DataTypes.STRING(30),
      unique: 'compositeIndex',
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
    //가입 경로
    path: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    //Level 테이블 FK
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: true,
    underscored: true
  });

};