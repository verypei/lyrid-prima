'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    kode_produk: DataTypes.STRING,
    nama_produk: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    image_produk: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};