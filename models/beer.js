module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Beer', {
    //맥주 이름(한글)
    k_name: {
      type: DataTypes.STRING,
      unique: 'compositeIndex',
      allowNull: false,
    },
    //맥주 이름(영어)
    e_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //도수(abv)
    abv: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    //맥주 이미지
    thumbnail_image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: 0
    },
    //제조국가
    brewery: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    //별점 평균
    star_avg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    //리뷰 수
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    //Aroma 테이블 FK
    aroma_id_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    aroma_id_2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_id_3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aroma_id_4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    //옵션지정
    freezeTableName: true,
    timestamps: false,
  });
};