import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-100' : '';
  };

  return (
    <div className="p-10">
      <nav className="flex gap-4 mb-8">
        <Button asChild variant="outline" className={isActive('/cars')}>
          <Link to="/cars">Cars</Link>
        </Button>
        <Button asChild variant="outline" className={isActive('/parts')}>
          <Link to="/parts">Parts</Link>
        </Button>
        <Button asChild variant="outline" className={isActive('/manufacturers')}>
          <Link to="/manufacturers">Manufacturers</Link>
        </Button>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Layout;