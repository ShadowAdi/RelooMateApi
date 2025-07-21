# 🏠 RelooMate Backend Assignment

This is a RESTful backend API built for RelooMate’s student housing platform. It provides user registration, login, onboarding content, and a protected user profile route for a React Native frontend.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Validation**: express-validator
- **Environment Configuration**: dotenv
- **Logging**: Winston

---

## 📁 Folder Structure

```
src/
├── config/           # App-wide config and constants
├── controllers/      # Route controllers
├── db/               # MongoDB connection logic
├── dummyData/        # Onboarding content
├── middlewares/      # Auth middleware, error handlers
├── models/           # Mongoose Models
├── routes/           # Express routes
├── schemas/          # Mongoose Schemas
├── services/         # Model Service
├── utils/            # utility functions
├── validators/       # Input validation logic
└── server.js         # Entry point
```

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ShadowAdi/RelooMateApi.git
cd reloo_mate_assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JSON_SECRET=your_super_secret_key
MOBILE_DEV_ORIGIN=http://<your-local-ip>:<your-port> || * (only in dev)
```

### 4. Run the Server

```bash
npm run dev
```

Your API should be running at:  
`http://localhost:3000/`

---

## 🔐 API Endpoints

### 📝 Register User

**POST** `/api/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 🔐 Login User

**POST** `/api/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

> Returns a JWT token on successful login.

---

### 👤 Get User Profile

**GET** `/api/profile`  
**Headers**:
```
Authorization: Bearer <your_token>
```

> Protected route. Returns name and email of logged-in user.

---

### 🚀 Get Onboarding Steps

**GET** `/api/onboarding`

> Protected route. I Also make this static as onboarding comes after register.


Returns static onboarding content like:


```json
[
  {
    "title": "Find a Place",
    "description": "Search listings near your college.",
    "image": "https://example.com/image1.png"
  },
  ...
]
```

---

## 🧪 Postman Collection

You can test the API using the Postman collection:  
📄 [`docs/RelooMate.postman_collection.json`](./docs/RelooMate.postman_collection.json)

---

## 🐳 Features

- Uses **environment variables** via `dotenv`
- Error handling middleware for better DX
- Clean codebase with modular structure

---


## ✍️ Notes

- Passwords are hashed using `bcrypt` with salt rounds.
- JWT tokens are valid for X hours (adjustable).
- Onboarding content is static but can later be stored in DB for dynamic control.

---

## 📬 Submission

- GitHub Repo: [Repo-Link](https://github.com/ShadowAdi/RelooMateApi)
- Postman: Included in `/docs`

---

## 👨‍💻 Author

**Aditya Shukla**  
Backend Developer Assignment for **RelooMate**
