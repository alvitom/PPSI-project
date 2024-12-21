# Category API Spesification

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
