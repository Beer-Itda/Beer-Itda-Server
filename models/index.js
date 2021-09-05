const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Beer = require('./beer')(sequelize, Sequelize);
db.Aroma = require('./aroma')(sequelize, Sequelize);
db.Country = require('./contry')(sequelize, Sequelize);
//db.Style_Big = require('./style_big')(sequelize, Sequelize);
//db.Style_Mid = require('./style_mid')(sequelize, Sequelize);
//db.Style_Small = require('./style_small')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Level = require('./level')(sequelize, Sequelize);
//db.Favorite = require('./favorite')(sequelize, Sequelize);
//db.Review = require('./review')(sequelize, Sequelize);

/** 1 : N  Country : Beer */
db.Country.hasMany(db.Beer);
db.Beer.belongsTo(db.Country);

/** 1 : N User : Level */
db.User.hasMany(db.Level);
db.Level.belongsTo(db.User);

module.exports = db;