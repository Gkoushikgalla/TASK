# FakeStore Dashboard – ReactJS + Redux Toolkit (RTK Query)

## 📌 Project Overview

This is a ReactJS web application built using Redux Toolkit and RTK Query that integrates with the FakeStore API.  

The application includes:
- Authentication
- Full CRUD operations
- Product filtering
- State management using RTK Query
- Clean Material UI interface
- Deployment on Netlify

---

## 🚀 Live Demo

🔗 Live URL: https://your-netlify-link.netlify.app  

---

## 🔐 Login Credentials (FakeStore API)

FakeStore provides test credentials:

Username: mor_2314
Password: 83r5^_


---

## ⚙ Tech Stack

- ReactJS
- Redux Toolkit
- RTK Query
- Material UI
- React Router
- React Toastify
- Netlify (Deployment)

---

## 📡 API Endpoints Implemented

### Authentication
- `POST /auth/login`

### Products
- `GET /products`
- `GET /products/:id`
- `GET /products/category/:category`
- `POST /products`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

All API calls are handled using **RTK Query**.

---

## 🎯 Features Implemented

✔ Login with token storage  
✔ Protected routes  
✔ Fetch all products  
✔ Fetch product by ID  
✔ Fetch products by category  
✔ Create new product  
✔ Update product (PUT)  
✔ Partial update (PATCH)  
✔ Delete product  
✔ Toast notifications for success & error  
✔ Responsive Material UI layout  

---

## 📂 Folder Structure

src/
├── api/
│ └── fakestoreApi.js
├── components/
│ ├── ProductCard.jsx
│ ├── ProductForm.jsx
│ └── ProtectedRoute.jsx
├── pages/
│ ├── Login.jsx
│ └── Dashboard.jsx
├── redux/
│ ├── store.js
│ └── authSlice.js
├── App.jsx
├── main.jsx
└── index.css


---

## 🛠 Run Locally

1. Clone the repository(npm install)
2. Install dependencies(npm run dev )
3. Start development server(npm run dev)
4. Build for production(npm run build)


---

## 📌 Notes

- FakeStore API does not persist data permanently.
- PUT and PATCH requests are verified via browser Network tab.
- RTK Query automatically handles loading and caching.

---

## 👨‍💻 Author

Koushik 


