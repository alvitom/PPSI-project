const db = require("../config/database");

class CategoryModel {
  static create(data) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO categories SET ?";
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static find() {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, name FROM categories ORDER BY id ASC";
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    });
  }

  static findByName(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM categories WHERE name = ?";
      db.query(query, [name], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results[0]);
        }
      });
    });
  }
}

module.exports = CategoryModel;
