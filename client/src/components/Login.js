import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{
        backgroundColor: darkMode ? '#2c3e50' : '#ecf0f1',
        color: darkMode ? '#ecf0f1' : '#2c3e50',
        position: 'relative',
      }}
    >
      <button
        onClick={toggleDarkMode}
        className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          border: '1px solid',
          borderRadius: '20px',
          padding: '10px',
          background: darkMode ? '#34495e' : '#bdc3c7',
          color: darkMode ? '#ecf0f1' : '#2c3e50',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {darkMode ? (
          <span role="img" aria-label="Sun">☀️</span>
        ) : (
          <span role="img" aria-label="Moon">🌙</span>
        )}
      </button>
 
      <div
        className="card p-5 w-100 shadow-lg"
        style={{
          maxWidth: '500px',
          borderRadius: '25px',
          backgroundColor: darkMode ? '#34495e' : '#ffffff',
          borderColor: darkMode ? '#1abc9c' : '#2980b9',
          borderWidth: '2px',
        }}
      >
        <h2 className="card-title text-center text-primary mb-4">Acceso al Sistema</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label text-info">Usuario</label>
            <input
              type="text"
              className={`form-control border-info ${darkMode ? 'bg-dark text-light' : ''}`}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                backgroundColor: darkMode ? '#2c3e50' : '#ffffff',
                color: darkMode ? '#ecf0f1' : '#2c3e50',
                fontSize: '18px',
                padding: '12px',
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-info">Contraseña</label>
            <input
              type="password"
              className={`form-control border-info ${darkMode ? 'bg-dark text-light' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: darkMode ? '#2c3e50' : '#ffffff',
                color: darkMode ? '#ecf0f1' : '#2c3e50',
                fontSize: '18px',
                padding: '12px',
              }}
            />
          </div>
          <button type="submit" className="btn btn-info w-100" style={{ fontSize: '20px', padding: '10px' }}>
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>¿No tienes cuenta? <Link to="/register" className="text-warning">Regístrate aquí</Link></p>
          <p>¿Olvidaste tu contraseña? <Link to="/forgot-password" className="text-warning">Recupérala</Link></p>
        </div>
      </div>
 
      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content border-info">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Inicio de sesión exitoso</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body bg-light text-info">
                <p>Bienvenido de nuevo</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default Login;
 