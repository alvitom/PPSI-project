# PPSI Project Backend Services

## Description

This is the backend service for **PPSI Project**, built using Node.js, Express.js, and MySQL.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/alvitom/PPSI-project.git ppsi-project
   cd ppsi-project
   ```
2. Create .env file

   ```plaintext
   DB_HOST=mysql_host
   DB_USER=mysql_user
   DB_PASSWORD=mysql_password
   DB_NAME=mysql_database

   PROJECT_ID=google-cloud-project-id
   GOOGLE_APPLICATION_CREDENTIALS=google-cloud-service-account

   BUCKET_NAME=google-cloud-storage-bucket
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Usage:

- Run in Development Mode
  ```bash
  npm run start:dev
  ```
- Run in Production Mode
  ```bash
  npm start
  ```

## Base URL

- **Development:**
  ```bash
  http://localhost:3000/api/v1
  ```
- **Production:**

  ```bash
  http://mieayamkeritingluwes.site/api/v1
  ```
