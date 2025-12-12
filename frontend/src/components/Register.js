import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      await AuthAPI.register(email, password);
      setOk("Usuario registrado. Ya podés iniciar sesión.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.message || "Error al registrar");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrarse</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {ok && <div className="alert alert-success">{ok}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default Register;
