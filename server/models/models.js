const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketPosition = sequelize.define('basket_position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Producer = sequelize.define('producer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    address: {type: DataTypes.STRING,allowNull: false},
})

const Property = sequelize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeProducer = sequelize.define('type_producer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketPosition)
BasketPosition.belongsTo(Basket)

Item.hasMany(BasketPosition)
BasketPosition.belongsTo(Item)

Item.hasMany(Property, {as: 'props'})
Property.belongsTo(Item)

Type.hasMany(Item)
Item.belongsTo(Type)

Producer.hasMany(Item)
Item.belongsTo(Producer)

Type.belongsToMany(Producer, { through: TypeProducer })
Producer.belongsToMany(Type, { through: TypeProducer})

module.exports = {
    User,
    Basket,
    BasketPosition,
    Item,
    Type,
    Producer,
    TypeProducer,
    Property
}