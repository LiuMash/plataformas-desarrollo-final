import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-12 mb-3">
            <Link to="/">
              <img src="/logo.png" alt="Deportes AR Logo" className="footer-logo mx-auto d-block" />
            </Link>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-center">
              <Link className="footer-link mx-3" to="/">Home</Link>
              <Link className="footer-link mx-3" to="/products">Productos</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-3 footer-copy">
        &copy; 2024 Deportes AR. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;