const NotFoundError = require("../exceptions/NotFoundError");
const MenuModel = require("../models/menu");
const OrderModel = require("../models/order");
const TransactionCode = require("../utils/transactionCodeGenerator");

class OrderService {
  static async createOrder(data) {
    const { customer, items, total } = data;

    for (const item of items) {
      const menu = await MenuModel.findByName(item.name);

      if (!menu) {
        throw new NotFoundError("Menu not found");
      }
    }

    const transactionCode = TransactionCode.generate();

    await OrderModel.create({ transaction_code: transactionCode, customer_name: customer, total_price: total });

    for (const item of items) {
      const menu = await MenuModel.findByName(item.name);

      await OrderModel.addOrderItem({ transaction_code: transactionCode, menu_item_id: menu.id, quantity: item.quantity, subtotal: item.subtotal });
    }

    const order = await OrderModel.findByTransactionCode(transactionCode);

    const payload = {
      transactionCode: order.transaction_code,
      customer: order.customer_name,
      items: items,
      total: order.total_price,
      status: order.order_status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };

    return payload;
  }

  static async getOrders(options) {
    const [orders, total] = await Promise.all([OrderModel.find(options), OrderModel.count(options)]);

    const totalPages = Math.ceil(total / options.limit);

    const payload = {
      orders: orders,
      totalItems: total,
      itemsPerPage: options.limit,
      totalPages: totalPages > 0 ? totalPages : 1,
      currentPage: options.offset / options.limit + 1,
      previousPage: options.offset > 0 ? options.offset / options.limit : null,
      nextPage: options.offset + options.limit < total ? options.offset / options.limit + 1 : null,
    };

    return payload;
  }

  static async getOrder(transactionCode) {
    const orderItems = await OrderModel.findOrderItems(transactionCode);

    if (!orderItems) {
      throw new NotFoundError("Order not found");
    }

    const items = orderItems.map((item) => ({
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    const payload = {
      transactionCode: orderItems[0].transaction_code,
      customer: orderItems[0].customer_name,
      items: items,
      total: orderItems[0].total_price,
      status: orderItems[0].order_status,
      createdAt: orderItems[0].created_at,
      updatedAt: orderItems[0].updated_at,
    };

    return payload;
  }

  static async updateOrderStatus(transactionCode, status) {
    const findOrder = await OrderModel.findByTransactionCode(transactionCode);

    if (!findOrder) {
      throw new NotFoundError("Order not found");
    }

    await OrderModel.updateOrderStatus(transactionCode, status);

    const order = await OrderModel.findByTransactionCode(transactionCode);

    const payload = {
      transactionCode: order.transaction_code,
      customer: order.customer_name,
      total: order.total_price,
      status: order.order_status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };

    return payload;
  }
}

module.exports = OrderService;
