'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venta.hasMany(models.ProductoVenta, { foreignKey: 'idVenta' });
    }
  }
  Venta.init({
    total: DataTypes.DECIMAL,
    iva: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};