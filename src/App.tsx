import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <div className="w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
