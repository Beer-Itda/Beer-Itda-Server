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
//db.Favorite = require('./favorite')(sequelize, Sequelize);
//db.Review = require('./review')(sequelize, Sequelize);

// Beer관계
/** 1 : N  Country : Beer */
db.Country.hasMany(db.Beer, {
  foreignKey: 'country_id',
  sourceKey: 'id'
});
db.Beer.belongsTo(db.Country, {
  foreignKey: 'country_id',
  targetKey: 'id'
});

db.Style_Small.hasMany(db.Beer, {
  foreignKey: 'style_id',
  sourceKey: 'id'
});
db.Beer.belongsTo(db.Style_Small, {
  foreignKey: 'style_id',
  targetKey: 'id'
});

/** 1 : N  Style_Big : Style_Mid */
db.Style_Big.hasMany(db.Style_Mid);
db.Style_Mid.belongsTo(db.Style_Big);

/** 1 : N  Style_Mid : Style_Small */
db.Style_Mid.hasMany(db.Style_Small);
db.Style_Small.belongsTo(db.Style_Mid);

/** 1 : N  Style_Mid : Style_Small */
db.Style_Mid.hasMany(db.Style_Small);
db.Style_Small.belongsTo(db.Style_Mid);

// User관계
/** 1 : N  Level : User */
db.Level.hasMany(db.User);
db.User.belongsTo(db.Level);

/** 1 : 1  Select : User */
db.Select.hasOne(db.User);
db.User.belongsTo(db.Select);

module.exports = db;