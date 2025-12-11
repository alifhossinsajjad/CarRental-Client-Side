<div align="center">

# 🚗 **AutoElite - Premium Car Rental Platform**

> A modern full-stack car rental application providing a seamless experience for users to browse, book, and manage car rentals — built with **React, Node.js, and MongoDB**.

[![React](https://img.shields.io/badge/Frontend-React.js-61DBFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Server-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-2EA043?logo=google-chrome&logoColor=white)](https://simple-firebase-authenti-d2c26.firebaseapp.com/)

</div>

---

## 🌟 **Overview**
**AutoElite (RentWheels)** offers a next-gen car rental experience with real-time booking management, secure authentication, and an elegant UI built for performance and usability.

🌐 **Live Demo:** [Click to Open App](https://car-rental-8fde9.web.app/)

---

## 🚀 **Main Features**

### 🔐 Authentication & Security
- Secure **JWT-based authentication**
- **Role-based access control** (user/owner)
- Protected routes for authorized access
- Persistent login sessions

### 🚗 Car Management System
- Browse cars with **search & filtering**
- Car detail pages with full specs and galleries
- Real-time **availability indicators**
- Highlighted **Top-rated cars (4.9+ rating)**

### 📅 Booking & Reservation
- **One-click booking** with instant confirmation
- **My Bookings Dashboard** to manage reservations
- Real-time updates on booking status
- Full booking history and transaction records

### 👤 User Dashboard
- **My Listings:** Manage cars you listed  
- **My Bookings:** Manage active rentals  
- Personalized recommendations  
- Profile management with editable info  

### 🎨 Modern UI/UX
- Fully **responsive design**
- Smooth **Framer Motion** animations  
- **TailwindCSS gradients & hover effects**  
- Clean typography and minimalistic layout  

---

## 🛠️ **Technology Stack**

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js, React Router, Tailwind CSS, Framer Motion, React Toastify, Sweetalert2 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, CORS |
| **Development Tools** | VS Code, Postman, Chrome DevTools, Git & GitHub |

---

## 📁 **Project Structure**

rentwheels/
├── client/ # React frontend
│ ├── src/
│ │ ├── Components/ # Reusable UI components
│ │ ├── Context/ # React context providers
│ │ ├── Pages/ # Main pages
│ │ └── ...
│ └── public/
├── server/ # Node.js backend
│ ├── routes/ # API routes
│ ├── models/ # Database models
│ └── ...
└── README.md



---

## ⚙️ **Installation & Setup**

### 🔧 Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

### 🧩 Backend Setup
```bash
cd server
npm install
npm start


💻 Frontend Setup

cd client
npm install
npm start


📍 Frontend → http://localhost:5173

📍 Backend → http://localhost:3000

🔄 API Endpoints
🔑 Authentication

| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/register` | Register new user       |
| POST   | `/login`    | Login and get JWT token |





🚘 Cars
| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| GET    | `/cars`     | Get all cars                |
| GET    | `/cars/:id` | Get car details             |
| POST   | `/cars`     | Add a new car *(Protected)* |
| PATCH  | `/cars/:id` | Update car *(Protected)*    |
| DELETE | `/cars/:id` | Delete car *(Protected)*    |



📅 Bookings

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/my-bookings`        | Get all bookings |
| POST   | `/my-bookings/:id`    | Create a booking |
| DELETE | `/my-bookings/:carId` | Cancel a booking |


🎨 Design System
🎨 Color Palette


| Role      | Color            |
| --------- | ---------------- |
| Primary   | Indigo `#4F46E5` |
| Secondary | Purple `#7C3AED` |
| Success   | Green `#10B981`  |
| Warning   | Yellow `#F59E0B` |
| Error     | Red `#EF4444`    |


🖋 Typography

Headings: Bold with gradient text

Body: System fonts for readability

Code: Monospace for code snippets



🧩 Core Pages

🏠 Home – Featured & trending cars

🚘 Browse Cars – Filter and explore

📄 Car Details – Full specifications & booking

📅 My Bookings – Manage reservations

🚙 My Listings – Manage owned cars

🔐 Auth Pages – Login & Register

🧰 Reusable Components

BrowseCarsCard – Display car info

TopRatedCar – Showcase premium cars

Loading – Loader spinner

Footer – Page footer

🚀 Deployment
Frontend (Vercel / Netlify)

npm run build


Backend (Render / Railway / Heroku)

Configure .env variables

Connect MongoDB Atlas

Deploy 🚀

🔒 Security

Input validation on all forms

Protected API routes

Secure JWT tokens

CORS configuration

Environment variables for sensitive data

🐛 Known Issues

🌐 Image uploads via URLs (no file upload yet)

💳 Payment gateway not integrated

📧 No email notifications

🔍 Basic filters only

🧑‍💻 No admin panel

🔮 Planned Improvements

💰 Stripe / PayPal payment integration

☁️ Cloud image upload

📩 Email notifications

🔎 Advanced filters & search

🧭 Admin dashboard

⭐ Review & rating system

📍 Location-based services

📱 Mobile app (React Native)

🤝 Contributing

Fork this repo

Create branch: git checkout -b feature/AmazingFeature

Commit: git commit -m "Add AmazingFeature"

Push: git push origin feature/AmazingFeature

Open a Pull Request

📄 License

This project is licensed under the MIT License – see LICENSE.md
 for details.

👨‍💻 Author

MD ALIF MIA
💼 Full-Stack Developer
🌐 GitHub Profile

💖 Acknowledgments

🎨 Icons: React Icons

⚙️ Animations: Framer Motion

🧱 Backend Patterns: Express.js Best Practices

💡 Design Inspired by Modern UI Systems



⭐ If you like this project, please star the repo! ⭐

