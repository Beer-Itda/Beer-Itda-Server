module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Beer', {
    //맥주 이름(한글)
    k_name: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    //맥주 이름(영어)
    e_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //제조사
    brewery: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //도수(abv)
    abv: {
      type: DataTypes.Float,
      allowNull: false,
    },
    //맥주 이미지
    thumbnail_image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: 0
    },
    //별점 평균
    star_avg: {
      type: DataTypes.Float,
      allowNull: false,
    },
    //제조사
    brewery: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //리뷰 수
    review_count: {
      type: DataTypes.Integer,
      allowNull: false,
    },
    //Aroma 테이블 FK
    aroma_id: {
      type: DataTypes.Integer,
      allowNull: false,
    },
    //Style 테이블 FK
    style_id: {
      type: DataTypes.Integer,
      allowNull: false,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};