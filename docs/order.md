# Order API Specification

## Create Order

- **Endpoint:** `/orders`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "customer": "John Doe",
    "items": [
      {
        "name": "Mie Jamur Bakso pangsit",
        "quantity": 2,
        "subtotal": 64000
      },
      {
        "name": "Bakso Kuah",
        "quantity": 1,
        "subtotal": 32000
      }
    ],
    "total": 96000
  }
  ```
- **Response (Success):**
  - **Status Code:** `201 Created`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Order created successfully",
      "data": {
        "transactionCode": "xxxxxxxxxx",
        "customer": "John Doe",
        "items": [
          {
            "name": "Mie Jamur Bakso pangsit",
            "quantity": 2,
            "subtotal": 64000
          },
          {
            "name": "Bakso Kuah",
            "quantity": 1,
            "subtotal": 32000
          }
        ],
        "total": 96000,
        "paymentMethod": "Unsettled",
        "status": "Pending",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Order List

- **Endpoint:** `/orders`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page` (Optional)
    - Default: `1`
    - Example: `/orders?page=2`
  - `limit` (Optional)
    - Default: `20`
    - Example: `/orders?limit=20`
  - `q` (Filter Search (Transaction Code or Customer Name)) (Optional)
    - Example: `/orders?q=john doe`
  - `status` (Filter Status) (Optional)
    - Example: `/orders?status=pending`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Orders fetched successfully",
      "data": {
        "orders": [
          {
            "transaction_code": "xxxxxxxxxx",
            "customer_name": "John Doe",
            "total_price": 96000,
            "payment_method": "Unsettled",
            "order_status": "Pending",
            "created_at": "xxxx-xx-xx...",
            "updated_at": "xxxx-xx-xx..."
          },
          ...
        ],
        "totalItems": 3,
        "itemsPerPage": 20,
        "totalPages": 1,
        "currentPage": 1,
        "previousPage": null,
        "nextPage": null
      }
    }
    ```

## Order Detail

- **Endpoint:** `/orders/:transactionCode`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Order fetched successfully",
      "data": {
        "transactionCode": "xxxxxxxxxx",
        "customer": "John Doe",
        "items": [
          {
            "name": "Mie Jamur Bakso pangsit",
            "price": 32000,
            "image": "image.jpg",
            "quantity": 2,
            "subtotal": 64000
          },
          {
            "name": "Bakso Kuah",
            "price": 32000,
            "image": "image.jpg",
            "quantity": 1,
            "subtotal": 32000
          }
        ],
        "total": 96000,
        "paymentMethod": "Unsettled",
        "status": "Pending",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Update Order Status

- **Endpoint:** `/orders/:transactionCode`
- **Method:** `PATCH`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Order status updated successfully",
      "data": {
        "transactionCode": "xxxxxxxxxx",
        "customer": "John Doe",
        "total": 96000,
        "paymentMethod": "Cash",
        "status": "Completed",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```
