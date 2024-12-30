const bcrypt = require("bcrypt");
const db = require("../config/database");

class UserModel {
  static create(data) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      const query = "INSERT INTO users SET ?";
      db.query(query, { ...data, password: hashedPassword }, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results[0]);
        }
      });
    });
  }

  static update(data, email) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET ? , updated_at = NOW() WHERE email = ?";
      db.query(query, [data, email], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static delete(email) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE email = ?";
      db.query(query, [email], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }
}

module.exports = UserModel;
