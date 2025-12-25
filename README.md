# 🛒 E-comm Aman Store

A full-stack **e-commerce web application** built using the **MERN stack**.
This project demonstrates core e-commerce functionalities such as user authentication, product management, cart handling, and payment integration, following industry-standard best practices.

---

## 🚀 Features

* User authentication & authorization (JWT based)
* Product listing and management
* Shopping cart functionality
* Secure checkout flow
* PayPal payment integration
* Image upload support
* RESTful API architecture
* Environment-based configuration (secure & production-ready)

---

## 🛠 Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5, CSS3

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Other Tools

* PayPal API
* dotenv
* Git & GitHub

---

## 📂 Project Structure

```
E-comm-Aman-store/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── public/
│
├── uploads/
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

This project uses environment variables for security.

Create a `.env` file in the root directory using the structure below:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

⚠️ **Do not commit `.env` files** — use `.env.example` as a reference.

---

## ▶️ Getting Started (Local Setup)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Amankumar259/E-comm-Aman-store.git
cd E-comm-Aman-store
```

### 2️⃣ Install dependencies

```bash
npm install
cd frontend
npm install
```

### 3️⃣ Run the application

```bash
# Backend
npm run server

# Frontend
cd frontend
npm start
```

The app will run on:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

---

## 🌐 Deployment

The application is deployment-ready and can be hosted on platforms like:

* Render
* Railway
* Vercel (frontend)
* MongoDB Atlas

All sensitive credentials should be configured using platform environment variables.

---

## 📌 Best Practices Followed

* No secrets committed to GitHub
* Environment-based configuration
* Modular backend architecture
* Clean and readable codebase

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is for educational and learning purposes.

---

### 👤 Author

**Aman Kumar**
GitHub: [https://github.com/Amankumar259](https://github.com/Amankumar259)
