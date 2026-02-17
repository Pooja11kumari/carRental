# 🚗 Car Rental Management System – Full Stack Web Application

A modern **Full Stack Car Rental Platform** built using **React (Vite + Tailwind CSS)** on the frontend and **Node.js, Express, MongoDB** on the backend.

This application allows users to browse available cars, make bookings, and manage their rentals, while owners/admins can add vehicles, monitor bookings, and manage the system through a dedicated dashboard.

Designed with scalability, clean UI, and secure authentication in mind.

---

## ✨ Key Features

### 👤 User Module
- User registration & JWT authentication
- Browse available cars
- View detailed car information
- Book cars
- View booking history
- Responsive UI for all devices
- Toast notifications for actions

### 🛠 Owner / Admin Module
- Owner dashboard
- Add new vehicles
- Manage listed cars
- View all bookings
- Booking approval management

---

## 🧱 System Architecture

- **Frontend:** React (Vite) + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT  
- **Image Uploads:** Multer / ImageKit  
- **API Communication:** Axios  
- **State Management:** React Hooks  

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Dotenv
- CORS

---

## 📁 Project Structure

```text
carRental/
│
├── client/                     # Frontend (React + Vite + Tailwind)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Application pages
│   │   ├── context/           # Global state management
│   │   ├── services/          # API calls (Axios)
│   │   ├── assets/            # Images & icons
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # Backend (Node + Express)
│   ├── controllers/           # Business logic
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API routes
│   ├── middlewares/           # Authentication middleware
│   ├── configs/               # DB & service configs
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md

