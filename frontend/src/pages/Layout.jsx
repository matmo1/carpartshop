import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-vh-100 bg-primary bg-opacity-10 p-4">
      <nav className="nav nav-pills mb-4">
        <Link to="/manufacturers" className="btn btn-primary m-2 text-white">
          🏭 Manufacturers
        </Link>
        <Link to="/cars" className="btn btn-primary m-2 text-white">
          🚗 Cars
        </Link>
        <Link to="/parts" className="btn btn-primary m-2 text-white">
          🔩 Parts
        </Link>
      </nav>
      
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;