const db = require("../config/database");

class MenuModel {
  static create(data) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO menus SET ?";
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static findByName(name) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT menus.id, menus.name, menus.description, menus.price, categories.name AS category, menus.quantity, menus.image, menus.rating, menus.created_at, menus.updated_at FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE menus.name = ?";
      db.query(query, [name], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results[0]);
        }
      });
    });
  }

  static find(limit, offset, search, category) {
    return new Promise((resolve, reject) => {
      if (search && category) {
        const query =
          "SELECT menus.id, menus.name, menus.price, categories.name AS category, menus.quantity, menus.image FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE categories.name = ? AND menus.name LIKE ? ORDER BY name ASC LIMIT ? OFFSET ?";
        db.query(query, [category, `%${search}%`, limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      } else if (search) {
        const query =
          "SELECT menus.id, menus.name, menus.price, categories.name AS category, menus.quantity, menus.image FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE menus.name LIKE ? ORDER BY name ASC LIMIT ? OFFSET ?";
        db.query(query, [`%${search}%`, limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      } else if (category) {
        const query =
          "SELECT menus.id, menus.name, menus.price, categories.name AS category, menus.quantity, menus.image FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE categories.name = ? ORDER BY name ASC LIMIT ? OFFSET ?";
        db.query(query, [category, limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      } else {
        const query = "SELECT menus.id, menus.name, menus.price, categories.name AS category, menus.quantity, menus.image FROM menus INNER JOIN categories ON menus.category_id = categories.id ORDER BY name ASC LIMIT ? OFFSET ?";
        db.query(query, [limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      }
    });
  }

  static count(search, category) {
    return new Promise((resolve, reject) => {
      if (search && category) {
        const query = "SELECT COUNT(*) AS total FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE menus.name LIKE ? AND categories.name = ?";
        db.query(query, [`%${search}%`, category], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      } else if (search) {
        const query = "SELECT COUNT(*) AS total FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE menus.name LIKE ?";
        db.query(query, [`%${search}%`], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      } else if (category) {
        const query = "SELECT COUNT(*) AS total FROM menus INNER JOIN categories ON menus.category_id = categories.id WHERE categories.name = ?";
        db.query(query, [category], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      } else {
        const query = "SELECT COUNT(*) AS total FROM menus INNER JOIN categories ON menus.category_id = categories.id";
        db.query(query, (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      }
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE menus SET ? , updated_at = NOW() WHERE id = ?";
      db.query(query, [data, id], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM menus WHERE id = ?";
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }
}

module.exports = MenuModel;
