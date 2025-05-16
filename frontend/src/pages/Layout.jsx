import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path) ? 'active' : '';
  };

  return (
    <div className="min-vh-100 bg-light p-4">
      <nav className="nav nav-pills mb-4">
      <Link to="/manufacturers" className="btn btn-primary m-2">🏭 Manufacturers</Link>
      <Link to="/cars" className="btn btn-primary m-2">🚗 Cars</Link>
      <Link to="/parts" className="btn btn-primary m-2">🔩 Parts</Link>
      </nav>
      
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;