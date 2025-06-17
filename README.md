# Mini Order Management System

This is a Mini Order Management System implemented with Node.js, Express, and MongoDB.
It allows authentication, authorization, product management, and order placement with a role-based authorization system.



---

## 🔹Features🔹

- 🔐 User Authentication and Authorization with JWT
- 👤 Roles: admin and member
- 🛍 Products:

    - Create, Update, Delete (admin only).

    - List with pagination or filtering (accessible by all).
- 📝 Orders:

    - Create (authenticated users).

    - View (own orders).

    - Update status (admin).


- 📁 Order History for users.

---

## 🔹Tech Stack🔹

- Node.js
- Express
- JWT Authentication
- bcrypt (for password hashing)
- Mongoose (for MongoDB)

---

## 🔹API Endpoints🔹

### 🔹Auth🔹
- POST /api/auth/Register — Signup new user

- POST /api/auth/Login — Login with credentials

### 🔹Products🔹
- POST /api/product — Create product (admin only)

- PUT /api/product/:id — Update product (admin only)

- DELETE /api/product/:id — Delete product (admin only)

- GET /api/product — List products (with pagination or filtering)

### 🔹Orders🔹
- POST /api/order — Create order (with array of products)

- GET /api/order — List orders (admin sees all, members see their own)

- PUT /api/order/:id — Update order status (admin only)

- GET /api/order/history — View own order history (members)

---

## 🔹Project Structure🔹

```bash
/src
 └ config/
 └ controllers/
 └ middleware/
 └ models/
 └ routes/
 └ services/
 └ app.js/
server.js
/tests
 └ app.test.js
```

---


## 🔹Environment Variables🔹
- Create a .env file in your root directory with following variables:
```bash
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```
---

## 🔹Installation🔹
```bash
git clone https://github.com/muaaz0333/Mini-Order-Management.git
cd Mini-Order-Management
npm install
```
---

## 🔹Running the Application🔹
```bash
npm start
```
✅ The application will start on http://localhost:3000

---

## 🙌 Follow the Author

Made with ❤️ by **Muaaz Ahmad**  
GitHub: [@muaaz0333](https://github.com/muaaz0333)  
LinkedIn: [linkedin.com/in/MuaazAhmad](https://www.linkedin.com/in/expertfullstackdeveloper/)

---