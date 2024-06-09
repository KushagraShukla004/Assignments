# React Form with Validation

This project is a React form with validation for required fields, error messages, and disabling submission until fields are filled correctly. Upon successful submission, it displays all the filled details on a new route.

## Features

- Validation for required fields
- Error messages for invalid inputs
- Submission button disabled until all fields are correctly filled
- Password field with show/hide functionality
- Country and City dropdowns
- Route to display filled details upon successful submission

## Required Fields

- First Name
- Last Name
- Username
- E-mail
- Password
- Phone Number (with country code)
- Country
- City
- PAN No. or Aadhar No.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KushagraShukla004/Assignments.git
   ```
2. Navigate to the project directory:
   ```bash
   cd form
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Code Overview

### App.js

```javascript
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import FormDetails from "./components/FormDetails";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/FormDetails" element={<FormDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```
