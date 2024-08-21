import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/forgot-password', { email});
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/reset-password');
      }, 4000);
    } catch (error) {
      console.error('Error al enviar la solicitud de recuperación:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-dark">
      <div className="card p-4 w-100 shadow" style={{ maxWidth: '400px', borderRadius: '20px' }}>
        <h2 className="card-title text-center text-danger mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-primary">Email</label>
            <input
              type="email"
              className="form-control border-primary"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Send Recovery Link</button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Correo enviado</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body bg-light text-danger">
                <p>Hemos enviado un enlace de recuperación a tu correo.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
