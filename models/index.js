const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Beer = require('./beer')(sequelize, Sequelize);
// 맥주 향
db.Aroma = require('./aroma')(sequelize, Sequelize);
// 맥주 제조국가
db.Country = require('./country')(sequelize, Sequelize);
// 맥주 스타일 
db.Style_Big = require('./style_big')(sequelize, Sequelize);
db.Style_Mid = require('./style_mid')(sequelize, Sequelize);
db.Style_Small = require('./style_small')(sequelize, Sequelize);

//사용자의 맥주 스타일/향 선택
db.Select = require('./select')(sequelize, Sequelize);
// 사용자
db.User = require('./user')(sequelize, Sequelize);
// 사용자 레벨
db.Level = require('./level')(sequelize, Sequelize);
// 찜 여부
db.Heart = require('./heart')(sequelize, Sequelize);
//리뷰 
db.Review = require('./review')(sequelize, Sequelize);

// Beer관계
/** 1 : N  Country : Beer */
db.Beer.belongsTo(db.Country, {
  foreignKey: 'country_id',
});

/** 1 : N  Style_Big : Style_Mid */
db.Style_Mid.belongsTo(db.Style_Big, {
  foreignKey: 'big_style_id',
});

/** 1 : N  Style_Mid : Style_Small */
db.Style_Small.belongsTo(db.Style_Mid, {
  foreignKey: 'mid_style_id',
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

/** 1 : N  Level : User */
//db.User.belongsTo(db.Select);

//onDelete: 'cascade'
module.exports = db;