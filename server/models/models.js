const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');

const Bike = sequelize.define('bikes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    typeId: { type: DataTypes.INTEGER, allowNull: false },
    //get property parses decimal value which by default is string in postgres to float value when selecting it
    rentalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0, 
        get(){
            return parseFloat(this.getDataValue('rentalPrice'))
        }   
    },
    isRented: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    rentalTimestamp: { type: DataTypes.DATE(0) } // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
}, {
    timestamps: false
});

const Type = sequelize.define('types', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: false
});

Type.hasMany(Bike, {
    foreignKey: 'typeId'
});
Bike.belongsTo(Type);

module.exports = {
    Type, 
    Bike
};