require("dotenv").config();
const { Products } = require("../models");

class Controller {
  static async getProducts(req, res) {
    try {
      let data = await Products.findAll({
        limit: 5,
        offset: (req.query.page - 1) * 5,
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(err);
    }
  }

  static async getProductById(req, res) {
    let id = req.params.id;
    try {
      let data = await Products.findOne({ where: { id } });
      res.status(200).json({ data });
    } catch (error) {
      res.status(404).json({ message: "data not found!!!" });
    }
  }

  static async addProduct(req, res) {
    let obj = {
      kode_produk: req.body.kode_produk,
      nama_produk: req.body.nama_produk,
      qty: req.body.qty,
      image_produk: req.body.image_produk,
    };
    try {
      let data = await Products.create(obj);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(err);
    }
  }

  static async updateProduct(req, res) {
    let id = req.params.id;
    let newData = {
      kode_produk: req.body.kode_produk,
      nama_produk: req.body.nama_produk,
      qty: req.body.qty,
      image_produk: req.body.image_produk,
    };
    try {
      let data = await Products.update(newData, { where: { id } });
      data
        ? res.status(200).json({messsage : "data updated"})
        : res.status(404).json({
            message: "data can't be updated / not found",
          });
    } catch (error) {
          res.status(500).json(error);
    }
  }

  static async deleteProduct(req, res) {
    let id = req.params.id;
    try {
      let data = await Products.destroy({ where: { id } });
      data
        ? res.status(201).json({ message: "Data has been removed" })
        : res.status(404).json({ message: "error data not found" });
    } catch (error) {
      res.status(500).json(err);
    }
  }
}
module.exports = Controller;
