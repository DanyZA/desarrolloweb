import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  const [newToken, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // Obtiene el token del parámetro de la URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/reset-password', { newToken, newPassword });
      setMessage(response.data.message);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 4000);
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      console.error('Error al restablecer la contraseña:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-dark">
      <div className="card p-4 w-100 shadow" style={{ maxWidth: '400px', borderRadius: '20px' }}>
        <h2 className="card-title text-center text-danger mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>

        <label htmlFor="newToken" className="form-label text-primary">Ingresa el token recibido</label>
            <input
              type="text"
              className="form-control border-primary"
              id="newToken"
              value={newToken}
              onChange={(e) => setToken(e.target.value)}
              required
            />

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label text-primary">New Password</label>
            <input
              type="password"
              className="form-control border-primary"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-primary">Confirm Password</label>
            <input
              type="password"
              className="form-control border-primary"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Reset Password</button>
        </form>
        {message && <p className="text-center text-danger mt-3">{message}</p>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Password Reset</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body bg-light text-danger">
                <p>Your password has been reset successfully.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;


/**
 * import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const ResetPassword = () => {
  const [newToken, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // Obtiene el token del parámetro de la URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      console.log(newToken)
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      console.error('Error al restablecer la contraseña:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-dark">
      <div className="card p-4 w-100 shadow" style={{ maxWidth: '400px', borderRadius: '20px' }}>
        <h2 className="card-title text-center text-danger mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="newToken" className="form-label text-primary">Ingresa el token recibido</label>
            <input
              type="text"
              className="form-control border-primary"
              id="newToken"
              value={newToken}
              onChange={(e) => setToken(e.target.value)}
              required
            />

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label text-primary">New Password</label>
            <input
              type="password"
              className="form-control border-primary"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-primary">Confirm Password</label>
            <input
              type="password"
              className="form-control border-primary"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Reset Password</button>
        </form>
        {message && <p className="text-center text-danger mt-3">{message}</p>}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Password Reset</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body bg-light text-danger">
                <p>Your password has been reset successfully.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

 */