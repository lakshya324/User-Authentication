# User Authentication System

This repository contains a **User Authentication System** built with **Node.js**, **Express**, and **TypeScript**. It provides a robust backend for user authentication, including features like user registration, login, OTP-based email verification, and role-based access control.

---

## Features

- **User Registration**: Users can sign up with their email and password.
- **Email Verification**: OTP-based email verification for account activation.
- **Login**: Secure login with JWT-based authentication.
- **Role-Based Access Control**: Admin and user roles with restricted access.
- **Password Encryption**: Secure password storage using bcrypt.
- **Rate Limiting**: Protects against brute force attacks.
- **Redis Integration**: Caching for OTPs and other temporary data.
- **MongoDB Integration**: Persistent storage for user data.
- **Error Handling**: Centralized error handling for API responses.
- **Environment Configuration**: Configurable via `.env` file.

---

## Project Structure

```
src/
├── config/         # Configuration files (e.g., database, environment variables)
├── controllers/    # Route handlers for business logic
├── emails/         # Email templates and mailer logic
├── middlewares/    # Express middlewares for authentication and validation
├── models/         # Mongoose models for MongoDB
├── routes/         # API route definitions
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (e.g., JWT, encryption, OTP)
├── validation/     # Validation schemas for request payloads
├── databases.ts    # Database connection logic
├── index.ts        # Entry point of the application
├── logs.ts         # Logging configuration
├── setup.ts        # Initial setup logic
```

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/lakshya324/User-Authentication.git
    cd User-Authentication
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the environment variables:
    ```env
    PORT=3000
    MONGODB_URI=<your_mongodb_uri>
    SECRET_KEY=<your_secret_key>
    REDIS_HOST=<your_redis_host>
    REDIS_PORT=<your_redis_port>
    REDIS_USERNAME=<your_redis_username>
    REDIS_PASSWORD=<your_redis_password>
    EMAIL=<your_email>
    PASSWORD=<your_email_password>
    ```
    Refer to the `.env` file in the repository for all required variables.

4. Build the project:
    ```bash
    npm run build
    ```

5. Start the server:
    ```bash
    npm start
    ```

6. For development mode with live reload:
    ```bash
    npm run dev
    ```

---

## API Endpoints

### Authentication Routes
- **POST** `/auth/signup` - Register a new user.
- **POST** `/auth/login` - Login with email and password.
- **POST** `/auth/otp/send` - Send OTP to email.
- **POST** `/auth/otp/verify` - Verify OTP for email verification.

### User Routes
- **GET** `/user/` - Fetch user details (authenticated users only).
- **PUT** `/user/` - Update user details.
- **DELETE** `/user/` - Delete user account.

### Admin Routes
- **GET** `/admin/all` - Fetch all users (admin only).
- **GET** `/admin/:id` - Fetch user by ID (admin only).
- **POST** `/admin/user` - Create a new user (admin only).
- **PUT** `/admin/user/:id` - Update user details (admin only).
- **DELETE** `/admin/user/:id` - Delete user (admin only).

---

## Technologies Used

- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **TypeScript**: Static typing.
- **MongoDB**: Database for persistent storage.
- **Redis**: In-memory data store for caching.
- **Nodemailer**: Email service.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: JWT-based authentication.
- **express-validator**: Request validation.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## Author

**Lakshya Sharma**  
[GitHub Profile](https://github.com/lakshya324)

For any queries, feel free to reach out via the [issues page](https://github.com/lakshya324/User-Authentication/issues).  