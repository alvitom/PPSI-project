class TransactionCode {
  static generate() {
    const timestampPart = Date.now().toString(36).slice(-5).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();

    const transactionCode = `${timestampPart}${randomPart}`;

    return transactionCode;
  }
}

module.exports = TransactionCode;
