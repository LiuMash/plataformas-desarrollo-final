import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthAPI } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  const redirectTo = location.state?.from?.pathname || "/products";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await AuthAPI.login(email, password);

      login({ email, role: data.role }, data.token, redirectTo);
      alert("Login exitoso");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>

      )}
      <div className="mt-3">
        <a href="/register">¿No tenés cuenta? Registrate</a>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}

            required
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>

        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/products")}
        >
          Ver productos
        </button>
      </form>
    </div>
  );
};

export default Login;
