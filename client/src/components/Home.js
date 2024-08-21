import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir a la página de inicio de sesión
    navigate('/');
  };

  const products = [
    {
      name: 'Camiseta de algodón',
      description: 'Camiseta de algodón 100% orgánico, disponible en varios colores.',
      price: '15.99 €',
      link: '/product/1',
      image: 'https://contents.mediadecathlon.com/p1998283/k$483d3e41ece2d40a7763d30e0337f9ee/playera-de-caza-sg100-manga-corta-dsh-caqui.jpg?format=auto&quality=70&f=800x0'  // URL de la imagen
    },
    {
      name: 'Pantalones vaqueros',
      description: 'Pantalones vaqueros ajustados con un diseño moderno y cómodo.',
      price: '29.99 €',
      link: '/product/2',
      image: 'https://media.revistagq.com/photos/6320780adfabb92b4903fa6e/master/w_1600%2Cc_limit/eugoods_66_444584.jpghttps://example.com/vaqueros.jpg'  // URL de la imagen
    },
    {
      name: 'Chaqueta de cuero',
      description: 'Chaqueta de cuero genuino, perfecta para cualquier ocasión.',
      price: '99.99 €',
      link: '/product/3',
      image: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/fc92471e-b514-45bb-b62c-366d389f469f.feebe9030e74e90921c73ed1309b1b19.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'  // URL de la imagen
    },
  ];

  return (
    <div className="container-fluid d-flex flex-column align-items-center min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/inicio">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contacto</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger nav-link" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1 className="my-4 text-center">Tienda de Ropa</h1>
      <div className="row w-100">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="text-muted">{product.price}</p>
                <Link to={product.link} className="btn btn-primary">Ver Detalles</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="mt-auto text-center">
        <p className="text-muted">© 2024 Tienda de Ropa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
