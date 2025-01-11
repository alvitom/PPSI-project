const db = require("../config/database");

class OrderModel {
  static create(data) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO orders SET ?";
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result.insertId);
        }
      });
    });
  }

  static findByTransactionCode(transactionCode) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM orders WHERE transaction_code = ?";
      db.query(query, [transactionCode], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results[0]);
        }
      });
    });
  }

  static addOrderItem(data) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO order_items SET ?";
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static find(options) {
    return new Promise((resolve, reject) => {
      const { status, limit, offset, search } = options;
      if (search && status) {
        const query = "SELECT * FROM orders WHERE (transaction_code LIKE ? OR customer_name LIKE ?) AND order_status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
        db.query(query, [`%${search}%`, `%${search}%`, status, limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      } else if (search) {
        const query = "SELECT * FROM orders WHERE transaction_code LIKE ? OR customer_name LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
        db.query(query, [`%${search}%`, `%${search}%`, limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      } else if (status) {
        const query = "SELECT * FROM orders WHERE order_status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
        db.query(query, [status, limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        });
      } else {
        const query = "SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?";
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

  static count(options) {
    return new Promise((resolve, reject) => {
      const { status, search } = options;
      if (search && status) {
        const query = "SELECT COUNT(*) AS total FROM orders WHERE (transaction_code LIKE ? OR customer_name LIKE ?) AND order_status = ?";
        db.query(query, [`%${search}%`, `%${search}%`, status], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      } else if (search) {
        const query = "SELECT COUNT(*) AS total FROM orders WHERE transaction_code LIKE ? OR customer_name LIKE ?";
        db.query(query, [`%${search}%`, `%${search}%`], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      } else if (status) {
        const query = "SELECT COUNT(*) AS total FROM orders WHERE order_status = ?";
        db.query(query, [status], (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results[0].total);
          }
        });
      } else {
        const query = "SELECT COUNT(*) AS total FROM orders";
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

  static findOrderItems(transactionCode) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT order_items.menu_item_id, order_items.quantity, order_items.subtotal, orders.*, menus.name, menus.price, menus.image FROM order_items INNER JOIN orders ON order_items.transaction_code = orders.transaction_code INNER JOIN menus ON order_items.menu_item_id = menus.id WHERE order_items.transaction_code = ?";
      db.query(query, [transactionCode], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    });
  }

  static updateOrderStatus(transactionCode, paymentMethod, status) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE orders SET payment_method = ? , order_status = ? , updated_at = NOW() WHERE transaction_code = ?";
      db.query(query, [paymentMethod, status, transactionCode], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }
}

module.exports = OrderModel;
