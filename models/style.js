module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Style', {
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level_detail: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        level_parent: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        level_detail_parent: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    })
};