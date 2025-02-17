# Menu API Specification

## Create Menu

- **Endpoint:** `/menus`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **Request Body:**
  ```json
  {
    "name": "Mie Ayam Bakso Pangsit",
    "description": "Mie ayam bakso pangsit adalah hidangan mie dengan topping ayam cincang, jamur cincang, bakso sapi, dan pangsit.",
    "price": 32000,
    "category": "Mie",
    "quantity": 15,
    "image": "image.jpg"
  }
  ```
- **Response (Success):**
  - **Status Code:** `201 Created`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Menu created successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "name": "Mie Ayam Bakso Pangsit",
        "description": "Mie ayam bakso pangsit adalah hidangan mie dengan topping ayam cincang, jamur cincang, bakso sapi, dan pangsit.",
        "price": 32000,
        "category": "Mie",
        "quantity": 15,
        "image": "image.jpg",
        "rating": 0,
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Menu List

- **Endpoint:** `/menus`
- **Method:** `GET`
- **Query Parameters:**
  - `page` (Optional)
    - Default: `1`
    - Example: `/menus?page=2`
  - `limit` (Optional)
    - Default: `20`
    - Example: `/menus?limit=20`
  - `q` (Filter Search) (Optional)
    - Example: `/menus?q=bakso kuah`
  - `category` (Filter Category) (Optional)
    - Example: `/menus?category=mie`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Menus fetched successfully",
      "data": {
        "menus": [
          {
            "id": "xxxxx-xxx-xxx-...",
            "name": "Bakso Kuah",
            "price": 32000,
            "image": "image.jpg"
          },
          ...
        ],
        "totalItems": 2,
        "itemsPerPage": 20,
        "totalPages": 1,
        "currentPage": 1,
        "previousPage": null,
        "nextPage": null
      }
    }
    ```

## Menu Detail

- **Endpoint:** `/menus/:name`
- **Method:** `GET`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Menu fetched successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "name": "Bakso Kuah",
        "description": "Bakso kuah spesial dengan isian bakso sapi pilihan, mie, dan sayuran segar. Disajikan dalam kuah kaldu sapi hangat dengan topping bawang goreng dan seledri. Tambahkan sambal, kecap, atau cuka sesuai selera untuk rasa yang lebih mantap.",
        "price": 32000,
        "category": "Bakso",
        "quantity": 10,
        "image": "image.jpg",
        "rating": 0,
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Update Menu

- **Endpoint:** `/menus/:name`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **Request Body:**
  ```json
  {
    "name": "Mie Ayam Bakso Pangsit",
    "description": "Mie ayam bakso pangsit adalah hidangan mie dengan topping ayam cincang, jamur cincang, bakso sapi, dan pangsit.",
    "price": 32000,
    "category": "Mie",
    "quantity": 15,
    "image": "image.jpg"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Menu updated successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "name": "Mie Ayam Bakso Pangsit",
        "description": "Mie ayam bakso pangsit adalah hidangan mie dengan topping ayam cincang, jamur cincang, bakso sapi, dan pangsit.",
        "price": 32000,
        "category": "Mie",
        "quantity": 15,
        "image": "image.jpg",
        "rating": 0,
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Delete Menu

- **Endpoint:** `/menus/:name`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Menu deleted successfully"
    }
    ```
