# Category API Spesification

## Create Category

- **Endpoint:** `/categories`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "name": "Topping"
  }
  ```
- **Response (Success):**
  - **Status Code:** `201 Created`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Category created successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "name": "Topping",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Category List

- **Endpoint:** `/categories`
- **Method:** `GET`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Categories fetched successfully",
      "data": {
        "categories": [
          {
            "id": "xxxxx-xxx-xxx-...",
            "name": "Mie"
          },
          {
            "id": "xxxxx-xxx-xxx-...",
            "name": "Bakso"
          },
          {
            "id": "xxxxx-xxx-xxx-...",
            "name": "Topping"
          }
        ]
      }
    }
    ```

## Category Detail

- **Endpoint:** `/categories/:name`
- **Method:** `GET`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Category fetched successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "name": "Topping",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Update Category

- **Endpoint:** `/categories/:name`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "name": "..."
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Category updated successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "name": "...",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Delete Category

- **Endpoint:** `/categories/:name`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Category deleted successfully"
    }
    ```
