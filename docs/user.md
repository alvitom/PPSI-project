# User API Specification

## Register

- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "securepassword",
    "confirmPassword": "securepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `201 Created`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "User created successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "name": "John Doe",
        "token": "token",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Login

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "User logged in successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "name": "John Doe",
        "token": "token",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Logout

- **Endpoint:** `/users/logout`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "User logged out successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "name": "John Doe",
        "token": "",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Forgot Password

- **Endpoint:** `/users/forgot-password`
- **Method:** `PATCH`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "newsecurepassword",
    "confirmPassword": "newsecurepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Password reset successfully. Please login with new password",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Get Profile

- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Profile fetched successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Update Profile

- **Endpoint:** `/users/profile`
- **Method:** `PATCH`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "name": "John",
    ...
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Profile updated successfully",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Change Password

- **Endpoint:** `/users/change-password`
- **Method:** `PATCH`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "oldPassword": "oldpassword",
    "newPassword": "newsecurepassword",
    "confirmPassword": "newsecurepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Password changed successfully. Please login again with new password",
      "data": {
        "id": "xxxxx-xxx-xxx-...",
        "email": "user@example.com",
        "token": "",
        "createdAt": "xxxx-xx-xx...",
        "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

## Delete Profile

- **Endpoint:** `/users/profile`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "password": "securepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Profile deleted successfully"
    }
    ```
