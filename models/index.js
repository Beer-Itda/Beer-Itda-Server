const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 맥주
db.Beer = require('./beer')(sequelize, Sequelize);
// 맥주 향
db.Aroma = require('./aroma')(sequelize, Sequelize);
// 맥주 제조국가
db.Country = require('./country')(sequelize, Sequelize);
// 맥주 스타일 
db.Style_Big = require('./style_big')(sequelize, Sequelize);
db.Style_Mid = require('./style_mid')(sequelize, Sequelize);
db.Style_Small = require('./style_small')(sequelize, Sequelize);

db.Style = require('./style')(sequelize, Sequelize);

//사용자의 맥주 스타일/향 선택
db.Select = require('./select')(sequelize, Sequelize);
// 사용자
db.User = require('./user')(sequelize, Sequelize);
// 사용자 레벨
db.Level = require('./level')(sequelize, Sequelize);
// 찜 여부
db.Heart = require('./heart')(sequelize, Sequelize);
// 리뷰 
db.Review = require('./review')(sequelize, Sequelize);
// 맥주-향 선택
db.Beer_Aroma = require('./beer_aroma')(sequelize, Sequelize);
// 스타일-맛 연결
db.Style_Taste = require('./style_taste')(sequelize, Sequelize);
// 맛
db.Taste = require('./taste')(sequelize, Sequelize);

/** [Beer]
/** 1 : N  Country : Beer */
db.Country.hasMany(db.Beer, {
  foreignKey: 'country_id',
});
db.Beer.belongsTo(db.Country, {
  foreignKey: 'country_id',
});

/** [Style]
/** 1 : N  Style_Big : Style_Mid */
db.Style_Big.hasMany(db.Style_Mid, {
  foreignKey: 'big_style_id',
});
db.Style_Mid.belongsTo(db.Style_Big, {
  foreignKey: 'big_style_id',
});

/** 1 : N  Style_Mid : Style_Small */
db.Style_Mid.hasMany(db.Style_Small, {
  foreignKey: 'mid_style_id',
});
db.Style_Small.belongsTo(db.Style_Mid, {
  foreignKey: 'mid_style_id',
});

/** 1 : N  Beer : Style_Small */
db.Style_Small.hasMany(db.Beer, {
  foreignKey: 'style_id',
});
db.Beer.belongsTo(db.Style_Small, {
  foreignKey: 'style_id',
});

/** [Select] 
 * N : M  User : Style */
db.Select.belongsTo(db.User, {
  through: 'User',
  foreignKey: 'user_id'
});

/** [Heart] 
 * N : M  User : Beer */
db.User.belongsToMany(db.Beer, {
  through: 'Heart',
  foreignKey: 'user_id'
});

db.Beer.belongsToMany(db.User, {
  through: 'Heart',
  foreignKey: 'beer_id'
});

/**[Review] 
 * M : M User : Review */
db.User.belongsToMany(db.Beer, {
  through: 'Review',
  foreignKey: 'user_id'
});

db.Beer.belongsToMany(db.User, {
  through: 'Review',
  foreignKey: 'beer_id'
});

/**[Beer_Aroma] 
 * N : M Beer : Beer_Aroma */
db.Aroma.belongsToMany(db.Beer, {
  through: 'Beer_Aroma',
  foreignKey: 'aroma_id'
});

db.Beer.belongsToMany(db.Aroma, {
  through: 'Beer_Aroma',
  foreignKey: 'beer_id'
});

/**[Style_Taste] 
 * N : M Style_Mid : Taste */
db.Style_Mid.belongsToMany(db.Taste, {
  through: 'Style_Taste',
  foreignKey: 'style_id'
});

db.Taste.belongsToMany(db.Style_Mid, {
  through: 'Style_Taste',
  foreignKey: 'taste_id'
});

//onDelete: 'cascade'
module.exports = db;