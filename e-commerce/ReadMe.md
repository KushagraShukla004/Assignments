# Shopify

Shopify is an e-commerce website built with a modern web development stack. This project is divided into two parts: the frontend and the backend, both running concurrently for a seamless development experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- User authentication and authorization using JWT and bcryptjs
- Real-time content management with Sanity.io
- Responsive and animated UI with React and Framer Motion
- State management using Redux Toolkit and Redux Thunk
- File uploads with Multer
- API endpoint handling with Express.js
- Secure cookie management with cookie-parser
- Cross-Origin Resource Sharing (CORS) support

## Technologies Used

### Backend

- **Express**: A minimal and flexible Node.js web application framework
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **bcryptjs**: Library to hash passwords
- **jsonwebtoken**: Library to work with JSON Web Tokens
- **dotenv**: Module to load environment variables from a `.env` file
- **cookie-parser**: Middleware to parse cookies
- **cors**: Middleware to enable CORS
- **express-async-handler**: Simple middleware for handling exceptions inside async express routes
- **express-formidable**: Middleware for parsing form data including file uploads
- **multer**: Middleware for handling `multipart/form-data`

### Frontend

- **React**: A JavaScript library for building user interfaces
- **React Router**: Declarative routing for React
- **Redux Toolkit**: The official, recommended way to write Redux logic
- **Framer Motion**: A library to power animations in React
- **TailwindCSS**: A utility-first CSS framework for rapid UI development
- **clsx**: Utility for constructing `className` strings conditionally
- **React Toastify**: Allows adding notifications to your app with ease
- **Slick Carousel**: Carousel component built with React and slick-carousel
- **ApexCharts**: Modern charting library that helps to create interactive visualizations
- **PayPal SDK**: For integrating PayPal payment gateway

### Development Tools

- **Vite**: Next Generation Frontend Tooling
- **ESLint**: A pluggable linting utility for JavaScript and JSX
- **Prettier**: An opinionated code formatter
- **TailwindCSS Autoprefixer**: Plugin for handling vendor prefixes

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Clone the repository

```sh
git clone https://github.com/your-username/shopify.git
cd shopify
```

### Install dependencies

- Backend:

```sh
cd backend
npm install
```

- Backend:

```sh
cd frontend
npm install
```

## Running the Project

- From the root directory, you can start both the backend and frontend concurrently using:

```sh
npm run dev
```

#Project Structure:

shopify/
│
├── backend/ # Backend source files
│ ├── controllers/ # Express controllers
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── utils/ # Utility functions
│ ├── index.js # Entry point for the backend
│ └── ...
│
├── frontend/ # Frontend source files
│ ├── public/ # Public assets
│ ├── src/ # React components, hooks, and utils
│ ├── index.html # Main HTML file
│ └── ...
│
├── .gitignore # Git ignore file
├── package.json # Root package.json for running scripts
├── README.md # Project documentation
└── ...
