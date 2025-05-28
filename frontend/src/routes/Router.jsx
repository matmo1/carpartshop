import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Cars from '../pages/Cars/Cars';
import CarDetails from '../pages/Cars/CarDetails';
import Parts from '../pages/Parts/Parts';
import PartDetails from '../pages/Parts/PartDetails';
import Manufacturers from '../pages/Manufacturers/Manufacturers';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Cars />} />
          <Route path="cars" element={<Cars />} />
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="parts" element={<Parts />} />
          <Route path="parts/:id" element={<PartDetails />} />
          <Route path="manufacturers" element={<Manufacturers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;