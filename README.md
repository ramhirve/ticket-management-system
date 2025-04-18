# 🎫 Ticket Management System API

A simple and secure RESTful API for managing support tickets. Built using **Node.js**, **Express**, and **MongoDB**, with **JWT authentication** and **role-based access control**.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 👥 User Signup/Login
- 🧑‍💻 Role-based Access Control (`user`, `agent`)
- 📝 Ticket CRUD (Create, Read, Update, Delete)
- 👤 Users can access only their own tickets
- 🛠️ Agents can manage all tickets

---

## 🧑‍💻 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for Authentication
- **bcrypt.js** for Password Hashing

---

## 📦 Project Setup

### Clone & Run

```bash
git clone https://github.com/yourusername/ticket-management-system.git
cd ticket-management-system
npm install
npm start




// .env
PORT=4001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


// folder structure
├── controllers/       # Business logic
├── middleware/        # Auth and role middlewares
├── models/            # Mongoose schemas
├── routes/            # API route handlers
├── config.js          # MongoDB config
├── index.js           # Entry point
├── .env               # Environment variables


📘 API Endpoints
🔐 Auth Routes – /api/v1/user
Method | Endpoint | Description
POST   | /signup  | Register new user
POST   | /login   | Login user
POST   | /logout  | Logout user



🎟️ Ticket Routes – /api/v1/ticket
Method | Endpoint           | Access     | Description
POST   | /create            | user       | Create a new ticket
GET    | /my/tickets        | user       | Get own tickets
GET    | /:ticketId         | user       | Get single ticket
PUT    | /update/:ticketId  | agent only | Update ticket (agent)
DELETE | /delete/:ticketId  | agent only | Delete ticket (agent)
GET    | /tickets           | agent only | View all tickets (agent)


👥 User Roles
User: Can register, login, create tickets, and view only their own tickets.

Agent (Admin): Can view, update, and delete all tickets.

