# TaxSquad - Your tax management in a simplified way.

**Taxsquad** is a full-featured tax management web application designed for freelancers and small business owners in Spain. It allows users to create, manage and download invoices, calculate quarterly and annual taxes, and store all fiscal documents securely. The platform is optimized for mobile and desktop, offering a modern UI and fluid user experience.

## 🎥 Demo

![Taxsquad](./frontend/public/Taxsquad-video.gif)

## 🚀 Features

### 🔐 Authentication & User Management

- Secure authentication via Firebase Authentication.
- Persistent login using local storage tokens.
- Protected routes for authorized access only.

### 📄 Document Management

- Upload, view, filter, and download tax-related documents (invoices, tax forms, etc.).
- Categorized documents by type: Quarterly and Annual.
- Able to download documents with integrated PDF generation using jsPDF.
- Real-time document actions (email, delete, and edit).

### 💸 Invoicing System

- Create and manage Income and Expense invoices.
- Dynamic sorting and filtering by date, client name, and amount.
- Responsive invoice list with dropdown actions and modal confirmation.
- Send invoices via email using EmailJS integration.
- Real-time document actions (email, delete, and edit).

### 🧾 Tax Declaration

- Custom validation for tax data entries.
- View submitted taxes within the Documents section.
- Support for Spanish-specific fields such as NIF, Autonomous Community, and Marital Status.

### 📊 Data Visualization

- Interactive bar charts for tracking income vs. expenses.
- Toggle between Monthly and Quarterly view.
- Scrollable view for mobile devices.
- Uses React-ApexCharts for high-quality responsive graphs.

### 🎨 UI & UX

- Built with Tailwind CSS for a modern and consistent design.
- Optimized for mobile and desktop (fully responsive layout).
- Smooth animations and transitions for enhanced user experience.
- Custom reusable components such as Buttons, Modals, Loaders, and Error handlers.

### ⚙️ Performance & Code Architecture

- Implements Lazy Loading for route-based code splitting.
- Modular folder structure using Feature-Sliced Design.
- Hooks and Redux Toolkit for centralized and scalable state management.
  -Clean code with adherence to SOLID principles and Clean Architecture.

### 🛠️ Dev Tools

- RESTful API built with Node.js and Express.js.
- Persistent data storage using MySQL.
- Integrated with Postman for API testing.

## 💻 Technologies

### Frontend

- React.js
- React Router
- Redux Toolkit
- Tailwind CSS
- JavaScript (ES6)
- Vite
- Plugins:
  - React Apexcharts
  - React Icons
  - jspdf
  - emailjs-com
  - framer-motion

### Backend

- Node.js
- Express.js
- MySQL2
- Nodemon
- Cors
- Dotenv
- Plugins:
  - bcrypt

### Authentication

- Firebase

## 📋 Environment Variables

To run this project, you need to have this prerequisites:

- `Node.js`(version 18+)
- `npm o yarn`
- `MySQL`
- `Firebase account`

## 📦 Installation

1. **Clone the repository**

```bash
  git clone https://github.com/francamateus93/Taxsquad.git
  cd Taxsquad
```

2. **Install frontend dependencies**

```bash
  cd frontend
  npm install
```

3. **Install backend dependencies**

```bash
  cd backend
  npm install
```

4. **Set up environment variables**  
   Create a `.env` file in the root of both `frontend` and `backend` folders and configure your keys.

5. **Run the project**

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

## 📘 Documentation

- [Build A REST API With Node.jsm & Express and MySQL](https://www.youtube.com/watch?v=fgTGADljAeg)
- [MySQL & Node.js & Express](https://www.youtube.com/watch?v=Hej48pi_lOc)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [Screaming Architecture - Evolution of a React folder structure](https://dev.to/profydev/screaming-architecture-evolution-of-a-react-folder-structure-4g25)

## 🤝 Support

A project created at IT Academy, in the FrontEnd Angular/React course at Barcelona Activa.

## 📌 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
