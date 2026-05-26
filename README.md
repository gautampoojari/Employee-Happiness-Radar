# 😊 Employee Happiness Radar

Employee Happiness Radar is a full-stack web application designed to analyze, monitor, and improve employee well-being within an organization. The platform allows employees to share feedback, complete mood check-ins, and participate in surveys, while administrators gain valuable insights through dashboards and analytics.

The goal of the project is to help organizations understand employee satisfaction levels, identify workplace issues early, and create a healthier and more productive work environment.

---

## 🚀 Features

### 👨‍💼 Employee Features

* 🔐 Secure Employee Authentication
* 😊 Daily Mood Check-In System
* 📝 Anonymous Employee Feedback
* 📋 Employee Survey Participation
* 📊 Personalized Employee Dashboard
* 📈 Track mood and engagement history

### 🛠️ Admin Features

* 🔑 Separate Admin Authentication
* 📊 Admin Dashboard & Analytics
* 🧠 Employee Happiness Monitoring
* 📋 Survey Creation & Management
* 💬 Feedback Review System
* 📈 Employee Mood Insights & Reports
* 🛡️ JWT-based Authorization & Protected Routes

---

## 🧠 How It Works

1. Employees create accounts and log in securely.
2. Users submit mood check-ins and workplace feedback.
3. Employees can participate in surveys created by admins.
4. The system stores and analyzes responses.
5. Admins monitor employee happiness trends through dashboards and analytics.
6. Insights help organizations improve workplace culture and employee satisfaction.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JSX / TSX
* Tailwind CSS
* Context API
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication
* Middleware-based Route Protection

### Database

* SQLite
* Sequelize ORM

---

## 📂 Project Structure

```bash
Employee-Happiness-Radar/
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── database.sqlite
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── App.jsx
│   ├── App.tsx
│   └── main.tsx
│
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Employee-Happiness-Radar.git
cd Employee-Happiness-Radar
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

Backend will run on:

```bash
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
npm install
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## 🔐 Authentication System

The project uses JWT (JSON Web Token) authentication for secure login and protected routes.

Features include:

* Employee Login & Signup
* Admin Login & Signup
* Protected Dashboard Routes
* Token-based Authorization

---

## 📊 Core Modules

### 😊 Mood Check-In Module

Employees can submit daily mood updates to help track overall workplace happiness.

### 💬 Feedback Module

Allows employees to provide workplace feedback and suggestions.

### 📋 Survey Module

Admins can create surveys and employees can submit responses.

### 📊 Analytics Dashboard

Admins can monitor employee engagement, mood trends, and feedback analytics.

---

## 📸 Application Screens

### 🔐 Authentication System

* Employee Login & Signup
* Admin Login & Signup

### 👨‍💼 Employee Dashboard

* Mood Check-In
* Feedback Submission
* Surveys
* Personal Overview

### 🛠️ Admin Dashboard

* Employee Analytics
* Survey Management
* Feedback Monitoring
* Mood Insights

---

## 💡 Future Improvements

* 📱 Mobile Responsive Optimization
* 📊 Advanced Data Visualization
* 📈 AI-based Sentiment Analysis
* ☁️ Cloud Deployment (AWS / Vercel)
* 🔔 Real-time Notifications
* 📧 Email Integration
* 🧠 Predictive Employee Satisfaction Analysis

---

## 👨‍💻 Author

**Gautam Poojari**
Aspiring Full Stack Developer

---

## ⭐ Contribute

Contributions, suggestions, and improvements are always welcome.

Feel free to fork this repository and submit pull requests.

---

## 📜 License

This project is open-source and available under the MIT License.

