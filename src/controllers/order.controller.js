const OrderService = require("../services/order.service");
const ApiResponse = require("../utils/ApiResponse");

class OrderController {
  static async createOrder(req, res) {
    const { customer, items, total } = req.body;

    const data = await OrderService.createOrder({ customer, items, total });

    ApiResponse.success(res, 201, "success", "Order created successfully", data);
  }

  static async getOrders(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.q;
    const status = req.query.status;

    const offset = (page - 1) * limit;

    const data = await OrderService.getOrders({ status, limit, offset, search });

    ApiResponse.success(res, 200, "success", "Orders fetched successfully", data);
  }

  static async getOrder(req, res) {
    const { transactionCode } = req.params;

    const data = await OrderService.getOrder(transactionCode);

    ApiResponse.success(res, 200, "success", "Order fetched successfully", data);
  }

  static async updateOrderStatus(req, res) {
    const { transactionCode } = req.params;
    const { status } = req.body;

    const data = await OrderService.updateOrderStatus(transactionCode, status);

    ApiResponse.success(res, 200, "success", "Order status updated successfully", data);
  }
}

module.exports = OrderController;
