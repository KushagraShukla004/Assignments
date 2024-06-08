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
