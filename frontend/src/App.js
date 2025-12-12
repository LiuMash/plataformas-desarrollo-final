import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductManagement from "./components/ProductManagement";
import Cart from "./components/Cart";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

const Home = () => (
  <div className="main-content">
    <h2 className="home-title">Bienvenidos a Deportes AR</h2>
    <p className="home-description">
      Encuentra los mejores productos deportivos
    </p>
    <Link to="/products">
      <button className="btn btn-primary home-button">aquí</button>
    </Link>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="container my-4 main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manage-products" element={<ProductManagement />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
